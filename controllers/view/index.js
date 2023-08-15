import express from "express";
import dashboardRouter from "./dashboardRouter.js";

const router = express.Router();

router.use(dashboardRouter);

export default router;
