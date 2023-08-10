import express from "express";
import homeRouter from "./homeRouter";
import dashboardRouter from "./dashboard";

const router = express.Router();

router.use(homeRouter);
router.use("/dashboard", dashboardRouter);

export default router;
