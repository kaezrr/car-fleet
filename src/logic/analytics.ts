import db from "../db";
import { AlertType } from "@prisma/client";

export type Analytics = {
  activeDrivers: number;
  inactiveDrivers: number;
  averageFuel: number;
  totalDistance: number;
  alertSummary: {
    lowFuel: number;
    speedViolation: number;
  };
};

export async function getAll(fleetId: string): Promise<Analytics> {
  const fleet = await db.fleet.findUnique({
    where: { id: fleetId },
  });
  if (!fleet) throw new Error("Fleet not found");

  const [lowFuelCount, speedViolationCount] = await Promise.all([
    db.alert.count({
      where: {
        type: AlertType.FUEL_LOW,
        vehicle: { fleetId },
      },
    }),
    db.alert.count({
      where: {
        type: AlertType.SPEED_VIOLATION,
        vehicle: { fleetId },
      },
    }),
  ]);

  const response: Analytics = {
    activeDrivers: fleet.activeVehicles,
    inactiveDrivers: fleet.totalVehicles - fleet.activeVehicles,
    averageFuel: fleet.averageFuel,
    totalDistance: fleet.lastDistanceDriven,
    alertSummary: {
      lowFuel: lowFuelCount,
      speedViolation: speedViolationCount,
    },
  };

  return response;
}
