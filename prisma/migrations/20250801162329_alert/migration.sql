/*
  Warnings:

  - You are about to drop the column `totalFuelWarns` on the `Fleet` table. All the data in the column will be lost.
  - You are about to drop the column `totalSpeedWarns` on the `Fleet` table. All the data in the column will be lost.
  - You are about to drop the column `lastSpeed` on the `VehicleStatus` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AlertType" AS ENUM ('SPEED_VIOLATION', 'FUEL_LOW');

-- AlterTable
ALTER TABLE "public"."Fleet" DROP COLUMN "totalFuelWarns",
DROP COLUMN "totalSpeedWarns";

-- AlterTable
ALTER TABLE "public"."Telemetry" ALTER COLUMN "timestamp" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."VehicleStatus" DROP COLUMN "lastSpeed",
ALTER COLUMN "lastDriven" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Alert" (
    "id" SERIAL NOT NULL,
    "type" "public"."AlertType" NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Alert" ADD CONSTRAINT "Alert_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
