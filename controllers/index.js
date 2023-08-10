import express from "express";
import apiRouter from "./api/index.js";
import dashboardRouter from "./dashboardRoutes/index.js";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/dashboard", dashboardRouter);

export default router;
