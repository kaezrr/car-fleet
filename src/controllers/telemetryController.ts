import { Telemetry } from "@prisma/client";
import { getAll, getLatest, insert } from "../logic/telemetry";
import { Request, Response } from "express";

export let getAllTelemetry = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let telemetry = await getAll(fleetId);

  res.json({
    status: "success",
    message: "Full telemetry history retrieved successfully",
    data: telemetry,
  });
};

export let getLatestTelemetry = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let telemetry = await getLatest(fleetId);

  res.json({
    status: "success",
    message: "Latest telemetry retrieved successfully",
    data: telemetry,
  });
};

export let insertTelemetry = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let telemetry: Telemetry[] = req.body;
  await insert(fleetId, telemetry);

  res.json({
    status: "success",
    message: "All telemetry added successfully",
    data: telemetry,
  });
};
