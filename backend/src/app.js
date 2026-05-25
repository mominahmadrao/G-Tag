import express from "express";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Route Imports
import { healthcheck } from "./controllers/healthcheck.controller.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import subscriptionPlanRouter from "./routes/subscriptionPlan.routes.js";

// Route Mounts
app.use("/api/v1/healthcheck", healthcheck);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/subscriptions/plans", subscriptionPlanRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// app.use((err, req, res, next) => {
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: err.success,
//       message: err.message,
//       errors: err.errors,
//       stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//     });
//   }

//   return res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

export default app;
