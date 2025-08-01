import express from "express";
import analyticsRouter from "./routes/analyticsRouter";
import alertRouter from "./routes/alertRouter";
import telemetryRouter from "./routes/telemetryRouter";
import vehicleRouter from "./routes/vehicleRouter";

export const MAX_SPEED = 60;
export const FUEL_THRESHOLD = 15;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/analytics", analyticsRouter);
app.use("/vehicle", vehicleRouter);
app.use("/telemetry", telemetryRouter);
app.use("/alert", alertRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
