export type Vehicle = {
  id: number; // Unique
  manufacturer: string;
  model: string;
  fleetId: number;
  owner: string;
  registration: "ACTIVE" | "MAINTENANCE" | "DECOMMISSIONED";
};

export type TelemetryData = {
  coordsLat: number;
  coordsLon: number;
  speed: number; // kilometers per hour
  engine: "ON" | "OFF" | "IDLE";
  fuel: number; // Percentage 0 - 100
  odometer: number; // kilometers
  diagnosticCode: number | null;
  timestamp: Date;
  vehicleId: number;
};
