export type Vehicle = {
  vin: string; // Unique
  manufacturer: string;
  model: string;
  fleetId: number;
  operator: string;
  registrationStatus: "Active" | "Maintenance" | "Decommissioned";
};

export type TelemetryData = {
  coordinates: { lat: number; lon: number };
  speed: number; // kilometers per hour
  engineStatus: "On" | "Off" | "Idle";
  fuel: number; // Percentage 0 - 100
  odometer: number; // kilometers
  diagnosticCode: number | null;
  timestamp: Date;
};
