import { Router } from "express";
import { getAlertsByType, getAllAlerts } from "../controllers/alertsController";

const router = Router();

router.get("/:fleetId/:alertId", getAlertsByType);
router.get("/:fleetId", getAllAlerts);

export default router;
