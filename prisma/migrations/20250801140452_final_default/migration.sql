-- AlterTable
ALTER TABLE "public"."Fleet" ALTER COLUMN "activeVehicles" SET DEFAULT 0,
ALTER COLUMN "averageFuel" SET DEFAULT 0,
ALTER COLUMN "lastDistanceDriven" SET DEFAULT 0,
ALTER COLUMN "totalFuelWarns" SET DEFAULT 0,
ALTER COLUMN "totalSpeedWarns" SET DEFAULT 0,
ALTER COLUMN "totalVehicles" SET DEFAULT 0;
