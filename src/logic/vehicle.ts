import { Vehicle } from "@prisma/client";
import db from "../db";

export async function insert(fleetId: string, vehicle: Vehicle) {
  await db.vehicle.create({
    data: {
      ...vehicle,
      fleetId,
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
}
