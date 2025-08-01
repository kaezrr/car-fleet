-- AlterTable
CREATE SEQUENCE "public".alerts_id_seq;
ALTER TABLE "public"."Alerts" ALTER COLUMN "id" SET DEFAULT nextval('"public".alerts_id_seq');
ALTER SEQUENCE "public".alerts_id_seq OWNED BY "public"."Alerts"."id";

-- AlterTable
CREATE SEQUENCE "public".fleet_id_seq;
ALTER TABLE "public"."Fleet" ALTER COLUMN "id" SET DEFAULT nextval('"public".fleet_id_seq');
ALTER SEQUENCE "public".fleet_id_seq OWNED BY "public"."Fleet"."id";

-- AlterTable
CREATE SEQUENCE "public".telemetry_id_seq;
ALTER TABLE "public"."Telemetry" ALTER COLUMN "id" SET DEFAULT nextval('"public".telemetry_id_seq'),
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE "public".telemetry_id_seq OWNED BY "public"."Telemetry"."id";
