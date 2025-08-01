import db from "../db";
import { Vehicle, TelemetryData } from "./types";

export async function insertCar(fleetId: number, vehicle: Vehicle) {
  await db.vehicle.create({
    data: {
      id: vehicle.id,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      owner: vehicle.owner,
      fleetId,
      registration: vehicle.registration,
    },
  });
}

export async function getAllCars(fleetId: number): Promise<Vehicle[]> {
  return await db.vehicle.findMany({
    where: {
      fleetId,
    },
  });
}

export async function getCarById(
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

export async function deleteCarById(fleetId: number, carId: number) {
  await db.vehicle.delete({
    where: {
      id: carId,
      fleetId,
    },
  });
}

export async function insertTelemetry(
  fleetId: number,
  telArray: TelemetryData[],
) {
  await db.telemetry.createMany({
    data: telArray.map((e) => ({
      coordsLat: e.coordinates.lat,
      coordsLon: e.coordinates.lon,
      speed: e.speed,
      odometer: e.speed,
      fuel: e.fuel,
      engine: e.engineStatus,
    })),
  });
}
