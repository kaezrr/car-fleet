import { Vehicle } from "@prisma/client";
import db from "../db";

export async function insert(fleetId: string, vehicle: Vehicle) {
  // we want vehicle + initial status + fleet bump to all succeed or all roll back
  await db.$transaction(async (tx) => {
    // 1) create the vehicle
    await tx.vehicle.create({
      data: {
        ...vehicle,
        fleetId,
      },
    });

    // 2) set its initial VehicleStatus to “inactive” (2 days ago)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    await tx.vehicleStatus.create({
      data: {
        vehicleId: vehicle.id,
        lastFuel: 0,
        lastOdometer: 0,
        lastDriven: twoDaysAgo,
      },
    });

    // 3) bump fleet.totalVehicles by +1
    await tx.fleet.update({
      where: { id: fleetId },
      data: {
        totalVehicles: { increment: 1 },
      },
    });
  });
}

export async function getAll(fleetId: string): Promise<Vehicle[]> {
  return await db.vehicle.findMany({
    where: {
      fleetId,
    },
  });
}

export async function getById(
  fleetId: string,
  carId: number,
): Promise<Vehicle | null> {
  return await db.vehicle.findFirst({
    where: {
      id: carId,
      fleetId,
    },
  });
}

export async function deleteById(fleetId: string, carId: number) {
  await db.$transaction(async (tx) => {
    await tx.vehicle.delete({
      where: { id: carId },
    });

    await tx.fleet.update({
      where: { id: fleetId },
      data: {
        totalVehicles: { decrement: 1 },
      },
    });
  });
}
