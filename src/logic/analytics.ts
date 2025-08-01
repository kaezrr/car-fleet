import db from "../db";

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
  let analytics = await db.fleet.findFirst({
    where: { id: fleetId },
  });

  if (analytics == null) {
    throw new Error("Analytics not found");
  }

  let response: Analytics = {
    activeDrivers: analytics.activeVehicles,
    inactiveDrivers: analytics.totalVehicles - analytics.activeVehicles,
    averageFuel: analytics.averageFuel,
    totalDistance: analytics.lastDistanceDriven,
    alertSummary: {
      lowFuel: analytics.totalFuelWarns,
      speedViolation: analytics.totalSpeedWarns,
    },
  };

  return response;
}
