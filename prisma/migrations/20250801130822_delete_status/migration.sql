/*
  Warnings:

  - You are about to drop the `Alerts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastSpeed` to the `VehicleStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Alerts" DROP CONSTRAINT "Alerts_fleetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Alerts" DROP CONSTRAINT "Alerts_vehicleId_fkey";

-- AlterTable
ALTER TABLE "public"."VehicleStatus" ADD COLUMN     "lastSpeed" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Alerts";

-- DropEnum
DROP TYPE "public"."Alert";
