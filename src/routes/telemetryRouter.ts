import { Router } from "express";
import {
  getAllTelemetry,
  getLatestTelemetry,
  insertTelemetry,
} from "../controllers/telemetryController";

const router = Router();

router.post("/:fleetId", insertTelemetry);
router.get("/:fleetId/latest", getLatestTelemetry);
router.get("/:fleetId", getAllTelemetry);

export default router;
