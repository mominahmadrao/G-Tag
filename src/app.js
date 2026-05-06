import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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

app.use("api/v1/healthcheck", healthcheck);

export default app;
