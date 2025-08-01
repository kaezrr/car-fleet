import { MAX_SPEED, FUEL_THRESHOLD } from "../app";
import { Telemetry, VehicleStatus, AlertType } from "@prisma/client";
import db from "../db";

let queue: number[] = [];

function isWithinLast24Hours(givenDate: Date) {
  const now = Date.now();
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
  return (
    givenDate.getTime() >= twentyFourHoursAgo && givenDate.getTime() <= now
  );
}

export async function getAll(fleetId: string): Promise<Telemetry[]> {
  return (
    (await db.telemetry.findMany({
      where: {
        vehicle: {
          fleetId,
        },
      },
    })) ?? []
  );
}

export async function getLatest(fleetId: string): Promise<Telemetry | null> {
  return await db.telemetry.findFirst({
    where: {
      vehicle: {
        fleetId,
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
}

export async function insert(fleetId: string, telArray: Telemetry[]) {
  telArray.forEach((t) => {
    if (typeof t.timestamp === "string") {
      t.timestamp = new Date(t.timestamp);
    }
  });
  const latestByVehicle = new Map<number, Telemetry>();
  for (const t of telArray) {
    const prev = latestByVehicle.get(t.vehicleId);
    if (!prev || t.timestamp.getTime() > prev.timestamp.getTime()) {
      latestByVehicle.set(t.vehicleId, t);
    }
  }
  const deduped = Array.from(latestByVehicle.values());

  deduped.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const fleet = await db.fleet.findUnique({ where: { id: fleetId } });
  if (!fleet) throw new Error("Fleet not found");

  const lastUpdates = await db.vehicleStatus.findMany({
    where: { Vehicle: { fleetId } },
  });
  const map = Object.fromEntries(
    lastUpdates.map((s) => [s.vehicleId, s] as const),
  ) as Record<number, VehicleStatus>;

  while (queue.length) {
    const vid = queue[0];
    const status = map[vid];
    if (isWithinLast24Hours(status.lastDriven)) break;
    queue.shift();
    fleet.activeVehicles--;
    fleet.lastDistanceDriven -= status.lastOdometer;
  }

  await db.$transaction(async (tx) => {
    for (const newtel of telArray) {
      const old = map[newtel.vehicleId];
      queue.push(newtel.vehicleId);

      fleet.averageFuel += (newtel.fuel - old.lastFuel) / fleet.totalVehicles;
      if (!isWithinLast24Hours(old.lastDriven)) {
        fleet.activeVehicles++;
        fleet.lastDistanceDriven += newtel.odometer;
      } else {
        fleet.lastDistanceDriven += newtel.odometer - old.lastOdometer;
      }

      if (newtel.speed > MAX_SPEED) {
        await tx.alert.create({
          data: {
            vehicleId: newtel.vehicleId,
            type: AlertType.SPEED_VIOLATION,
            timestamp: newtel.timestamp,
          },
        });
      }

      if (newtel.fuel < FUEL_THRESHOLD) {
        await tx.alert.create({
          data: {
            vehicleId: newtel.vehicleId,
            type: AlertType.FUEL_LOW,
            timestamp: newtel.timestamp,
          },
        });
      }

      await tx.vehicleStatus.update({
        where: { vehicleId: newtel.vehicleId },
        data: {
          lastDriven: newtel.timestamp,
          lastFuel: newtel.fuel,
          lastOdometer: newtel.odometer,
        },
      });
    }

    await tx.fleet.update({
      where: { id: fleetId },
      data: {
        activeVehicles: fleet.activeVehicles,
        lastDistanceDriven: fleet.lastDistanceDriven,
        averageFuel: fleet.averageFuel,
      },
    });

    await tx.telemetry.createMany({ data: telArray });
  });
}
