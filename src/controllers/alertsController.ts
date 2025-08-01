import { getAll, getByType } from "../logic/alerts";
import { Request, Response } from "express";

type Alert = "speed-violation" | "low-fuel";

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
  let alertType: Alert = req.params.alertId as Alert;
  let alerts = await getByType(fleetId, alertType);

  res.json({
    status: "success",
    message: "All active alerts of given type retrieved successfully",
    data: alerts,
  });
};
