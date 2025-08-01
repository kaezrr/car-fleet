import db from "../db";
import { Vehicle } from "@prisma/client";
import { MAX_SPEED, FUEL_THRESHOLD } from "../app";

export async function getByType(
  fleetId: string,
  alert: "speed-violation" | "low-fuel",
) {
  let statuses = await db.vehicleStatus.findMany({
    where: { Vehicle: { fleetId } },
    include: { Vehicle: true },
  });

  let response: Vehicle[] = [];
  statuses.forEach((e) => {
    if (alert == "speed-violation" && e.lastSpeed > MAX_SPEED)
      response.push(e.Vehicle);
    if (alert == "low-fuel" && e.lastFuel < FUEL_THRESHOLD)
      response.push(e.Vehicle);
  });

  return response;
}

export async function getAll(fleetId: string) {
  let statuses = await db.vehicleStatus.findMany({
    where: { Vehicle: { fleetId } },
    include: { Vehicle: true },
  });

  let response: { type: "speed-violation" | "low-fuel"; vehicle: Vehicle }[] =
    [];
  statuses.forEach((e) => {
    if (e.lastSpeed > MAX_SPEED)
      response.push({ type: "speed-violation", vehicle: e.Vehicle });
    if (e.lastFuel < FUEL_THRESHOLD)
      response.push({ type: "low-fuel", vehicle: e.Vehicle });
  });

  return response;
}
