import { Vehicle, TelemetryData } from "../logic/types";

export let DB_VEHICLE: Vehicle[] = [];
export let DB_TELEMETRY: { [fleetid: number]: TelemetryData } = {};
