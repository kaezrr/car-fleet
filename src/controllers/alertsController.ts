import { AlertType } from "@prisma/client";
import { getAll, getByType } from "../logic/alerts";
import { Request, Response } from "express";

export let getAllAlerts = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let alerts = await getAll(fleetId);

  res.json({
    status: "success",
    message: "All alerts retrieved successfully",
    data: alerts,
  });
};

export let getAlertsByType = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let alertType: AlertType =
    AlertType[req.params.alertId as keyof typeof AlertType];
  let alerts = await getByType(fleetId, alertType);

  res.json({
    status: "success",
    message: "All alerts of given type retrieved successfully",
    data: alerts,
  });
};
