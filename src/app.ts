import express from "express";
import { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello", message1: "World" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
