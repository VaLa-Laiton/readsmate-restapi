import express from "express";
import cors from "cors";
import { pool } from "./db.js";

import userRoutes from "./routes/user.routes.js";
import articleRoutes from "./routes/article.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import morgan from "morgan";

const app = express();

app.use(cors({ origin: ["https://readsmate.netlify.app"] }));

app.use(morgan("dev"));

app.use(express.json());

app.get("/ping", async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.status(200).json(result[0]);
});

app.use("/api", userRoutes);
app.use("/api", articleRoutes);
app.use("/api", commentRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint no encontrado :(" });
});

export default app;
