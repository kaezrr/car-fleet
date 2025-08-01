import { Telemetry } from "@prisma/client";
import db from "../db";

export async function getAll(fleetId: string): Promise<Telemetry[]> {
  return await db.telemetry.findMany({
    where: {
      vehicle: {
        fleetId,
      },
    },
  });
}

export async function getLatest(fleetId: string): Promise<Telemetry | null> {
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

export async function insert(telArray: Telemetry[]) {
  await db.telemetry.createMany({
    data: telArray,
  });
}
