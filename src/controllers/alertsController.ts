import { Alert } from "@prisma/client";
import { getAll, getByType } from "../logic/alerts";
import { Request, Response } from "express";

export let getAllAlerts = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let alerts = await getAll(fleetId);

  res.json({
    status: "success",
    message: "All active alerts retrieved successfully",
    data: alerts,
  });
};

export let getAlertsByType = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let alertType = Alert[req.params.alert as keyof typeof Alert];
  let alerts = await getByType(fleetId, alertType);

  res.json({
    status: "success",
    message: "All active alerts of given type retrieved successfully",
    data: alerts,
  });
};
