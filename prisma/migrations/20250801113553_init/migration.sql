-- CreateEnum
CREATE TYPE "public"."RegistrationStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'DECOMMISSIONED');

-- CreateEnum
CREATE TYPE "public"."EngineStatus" AS ENUM ('ON', 'OFF', 'IDLE');

-- CreateEnum
CREATE TYPE "public"."Alert" AS ENUM ('SPEED_VIOLATION', 'LOW_FUEL');

-- CreateTable
CREATE TABLE "public"."Fleet" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "registration" "public"."RegistrationStatus" NOT NULL,
    "fleetId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VehicleStatus" (
    "vehicleId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Telemetry" (
    "id" SERIAL NOT NULL,
    "coordsLon" INTEGER NOT NULL,
    "coordsLat" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "engine" "public"."EngineStatus" NOT NULL,
    "fuel" INTEGER NOT NULL,
    "odometer" INTEGER NOT NULL,
    "diagnosticCode" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alerts" (
    "id" SERIAL NOT NULL,
    "type" "public"."Alert" NOT NULL,
    "fleetId" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleStatus_vehicleId_key" ON "public"."VehicleStatus"("vehicleId");

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "public"."Fleet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleStatus" ADD CONSTRAINT "VehicleStatus_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Telemetry" ADD CONSTRAINT "Telemetry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alerts" ADD CONSTRAINT "Alerts_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "public"."Fleet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alerts" ADD CONSTRAINT "Alerts_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
