import { getAll } from "../logic/analytics";
import { Request, Response } from "express";

export let getAnalytics = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let analytics = await getAll(fleetId);

  res.json({
    status: "success",
    message: "Analytics retrieved successfully",
    data: analytics,
  });
};
