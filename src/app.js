import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.get("/", (req, res) => {
  res.send("Welcome to GTAG");
});

// Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// importing the routes
import { healthcheck } from "./controllers/healthcheck.controller.js";
import authRouter from "./routes/auth.route.js";

app.use("/api/v1/healthcheck", healthcheck);
app.use("/api/v1/auth", authRouter);

export default app;
