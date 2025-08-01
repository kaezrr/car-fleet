import { Router } from "express";

const router = Router();

router.post("/:fleetId");
router.get("/:fleetId/:carId");
router.get("/:fleetId");
router.delete("/:fleetId/:carId");

export default router;
