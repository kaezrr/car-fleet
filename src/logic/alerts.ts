import db from "../db";
import { AlertType } from "@prisma/client";

export async function getByType(fleetId: string, alert: AlertType) {
  let statuses = await db.alert.findMany({
    where: { vehicle: { fleetId }, type: alert },
  });

  return statuses;
}

export async function getAll(fleetId: string) {
  let statuses = await db.vehicleStatus.findMany({
    where: { Vehicle: { fleetId } },
  });

  return statuses;
}
