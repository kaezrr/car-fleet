import db from "../db";
import { Vehicle } from "./types";

export async function insert(fleetId: number, vehicle: Vehicle) {
  await db.vehicle.create({
    data: {
      ...vehicle,
      fleetId,
    },
  });
}

export async function getAll(fleetId: number): Promise<Vehicle[]> {
  return await db.vehicle.findMany({
    where: {
      fleetId,
    },
  });
}

export async function getById(
  fleetId: number,
  carId: number,
): Promise<Vehicle | null> {
  return await db.vehicle.findFirst({
    where: {
      id: carId,
      fleetId,
    },
  });
}

export async function deleteById(fleetId: number, carId: number) {
  await db.vehicle.delete({
    where: {
      id: carId,
      fleetId,
    },
  });
}
