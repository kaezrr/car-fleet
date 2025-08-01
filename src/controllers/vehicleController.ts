import { Request, Response } from "express";
import { getAll, getById, deleteById, insert } from "../logic/vehicle";
import { Vehicle } from "@prisma/client";

export let getAllCars = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let vehicles = await getAll(fleetId);

  res.json({
    status: "success",
    message: "All vehicles received successfully",
    data: vehicles,
  });
};

export let getCarById = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let carId = parseInt(req.params.carId);
  let vehicle = await getById(fleetId, carId);

  res.json({
    status: "success",
    message: "Vehicle retrieved successfully",
    data: vehicle,
  });
};

export let deleteCarById = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let carId = parseInt(req.params.carId);
  await deleteById(fleetId, carId);

  res.json({
    status: "success",
    message: "Vehicle deleted successfully",
  });
};

export let insertCar = async (req: Request, res: Response) => {
  let fleetId = req.params.fleetId;
  let vehicle: Vehicle = req.body;
  await insert(fleetId, vehicle);

  res.json({
    status: "success",
    message: "Vehicle added successfully",
    data: vehicle,
  });
};
