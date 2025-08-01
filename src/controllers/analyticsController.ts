import db from "../db";

export class Analytics {
  activeDrivers: number = 0;
  inactiveDrivers: number = 0;
  averageFuel: number = 0;
  totalDistance: number = 0;
  alertSummar: {
    lowFuel: number;
    speedViolation: number;
  } = { lowFuel: 0, speedViolation: 0 };
}

function isWithinLast24Hours(givenDate: Date) {
  const now = Date.now();
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const givenDateTimestamp = givenDate.getTime();
  return givenDateTimestamp >= twentyFourHoursAgo && givenDateTimestamp <= now;
}

async function getAnalytics(fleetId: string): Promise<Analytics> {
  let drivers = await db.vehicleStatus.findMany({
    where: { vehicle: { fleetId } },
  });

  let analytics = new Analytics();

  return analytics;
}
