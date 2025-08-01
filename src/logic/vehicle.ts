import { Vehicle } from "@prisma/client";
import db from "../db";

export async function insert(fleetId: string, vehicle: Vehicle) {
  await db.vehicle.create({
    data: {
      ...vehicle,
      fleetId,
    },
  });

  let last = new Date();
  last.setDate(last.getDate() - 2);
  await db.vehicleStatus.create({
    data: {
      lastSpeed: 0,
      lastFuel: 100,
      lastOdometer: 0,
      lastDriven: last,
      vehicleId: vehicle.id,
    },
  });

  const fleet = await db.fleet.findFirst({
    where: {
      id: fleetId,
    },
  });

  fleet!.totalVehicles++;

  await db.fleet.update({
    where: {
      id: fleetId,
    },
    data: {
      totalVehicles: fleet!.totalVehicles,
    },
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
  await db.vehicle.delete({
    where: {
      id: carId,
      fleetId,
    },
  });
  const fleet = await db.fleet.findFirst({
    where: {
      id: fleetId,
    },
  });

  fleet!.totalVehicles--;

  await db.fleet.update({
    where: {
      id: fleetId,
    },
    data: {
      totalVehicles: fleet!.totalVehicles,
    },
  });
}
