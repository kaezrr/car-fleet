import { Router } from "express";
import {
  deleteCarById,
  getAllCars,
  getCarById,
  insertCar,
} from "../controllers/vehicleController";

const router = Router();

router.post("/:fleetId", insertCar);
router.get("/:fleetId/:carId", getCarById);
router.get("/:fleetId", getAllCars);
router.delete("/:fleetId/:carId", deleteCarById);

export default router;
