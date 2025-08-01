import db from "../db";
import { Alert } from "@prisma/client";

export async function getAlertsById(fleetId: String, alert: Alert) {}

export async function getAllAlerts(fleetId: String) {
  return await db.alerts.findMany({
    where: {},
  });
}
