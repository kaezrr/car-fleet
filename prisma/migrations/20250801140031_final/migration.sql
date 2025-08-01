/*
  Warnings:

  - Added the required column `activeVehicles` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageFuel` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDistanceDriven` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFuelWarns` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSpeedWarns` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVehicles` to the `Fleet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Fleet" ADD COLUMN     "activeVehicles" INTEGER NOT NULL,
ADD COLUMN     "averageFuel" INTEGER NOT NULL,
ADD COLUMN     "lastDistanceDriven" INTEGER NOT NULL,
ADD COLUMN     "totalFuelWarns" INTEGER NOT NULL,
ADD COLUMN     "totalSpeedWarns" INTEGER NOT NULL,
ADD COLUMN     "totalVehicles" INTEGER NOT NULL;
