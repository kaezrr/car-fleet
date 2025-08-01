import { Router } from "express";

const router = Router();

router.get("/:fleetId/:alertId");
router.get("/:fleetId");

export default router;
