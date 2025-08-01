import { Telemetry, VehicleStatus } from "@prisma/client";
import db from "../db";
import { FUEL_THRESHOLD, MAX_SPEED } from "../app";

function isWithinLast24Hours(givenDate: Date) {
  const now = Date.now();
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const givenDateTimestamp = givenDate.getTime();
  return givenDateTimestamp >= twentyFourHoursAgo && givenDateTimestamp <= now;
}

let queue: number[] = [];

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
  const fleet = await db.fleet.findFirst({
    where: { id: fleetId },
  });

  if (fleet == null) {
    throw new Error("Fleet not found");
  }

  const lastUpdates = await db.vehicleStatus.findMany({
    where: { Vehicle: { fleetId } },
  });

  let map: { [id: number]: VehicleStatus } = {};
  lastUpdates.forEach((e) => {
    map[e.vehicleId] = e;
  });

  console.log(queue);
  console.log(map);
  console.log(telArray);

  while (queue.length > 0) {
    if (isWithinLast24Hours(new Date(map[queue[0]].lastDriven))) break;
    let last_driver = map[queue.shift()!];
    fleet.activeVehicles--;
    fleet.lastDistanceDriven -= last_driver.lastOdometer;
  }

  await telArray.forEach(async (newtel) => {
    queue.push(newtel.id);
    let oldtel = map[newtel.vehicleId];
    fleet.averageFuel += (newtel.fuel - oldtel.lastFuel) / fleet.totalVehicles;
    if (oldtel.lastFuel < FUEL_THRESHOLD && newtel.fuel >= FUEL_THRESHOLD)
      fleet.totalFuelWarns--;
    if (oldtel.lastFuel >= FUEL_THRESHOLD && newtel.fuel < FUEL_THRESHOLD)
      fleet.totalFuelWarns++;

    if (oldtel.lastSpeed <= MAX_SPEED && newtel.speed > MAX_SPEED)
      fleet.totalSpeedWarns++;
    if (oldtel.lastSpeed > MAX_SPEED && newtel.speed <= MAX_SPEED)
      fleet.totalSpeedWarns--;

    if (!isWithinLast24Hours(oldtel.lastDriven)) {
      fleet.activeVehicles++;
      fleet.lastDistanceDriven += newtel.odometer;
    } else {
      fleet.lastDistanceDriven += newtel.odometer - oldtel.lastOdometer;
    }

    await db.vehicleStatus.update({
      where: { vehicleId: newtel.vehicleId },
      data: {
        lastDriven: newtel.timestamp,
        lastFuel: newtel.fuel,
        lastOdometer: newtel.odometer,
        lastSpeed: newtel.speed,
      },
    });
  });

  await db.fleet.update({
    where: { id: fleetId },
    data: fleet,
  });

  await db.telemetry.createMany({
    data: telArray,
  });
}
