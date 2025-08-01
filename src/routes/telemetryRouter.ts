import { Router } from "express";

const router = Router();

router.post("/:fleetId");
router.get("/:fleetId/latest");
router.get("/:fleetId");

export default router;
