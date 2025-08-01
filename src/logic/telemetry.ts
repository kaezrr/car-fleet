import db from "../db";
import { TelemetryData } from "./types";

export async function getAll(fleetId: number): Promise<TelemetryData[]> {
  return await db.telemetry.findMany({
    where: {
      vehicle: {
        fleetId,
      },
    },
  });
}

export async function getLatest(
  fleetId: number,
): Promise<TelemetryData | null> {
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

export async function insert(telArray: TelemetryData[]) {
  await db.telemetry.createMany({
    data: telArray,
  });
}
