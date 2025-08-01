import db from "../db";
import { Alert } from "@prisma/client";

export async function getByType(fleetId: string, alert: Alert) {
  return await db.alerts.findMany({
    where: { fleetId, type: alert },
  });
}

export async function getAll(fleetId: string) {
  return await db.alerts.findMany({
    where: { fleetId },
  });
}
