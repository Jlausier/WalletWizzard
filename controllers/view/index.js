import express from "express";
import path from "path";
import dashboardRouter from "./dashboardRouter.js";
import { __dirname } from "../../utils/fsUtils.js";

const router = express.Router();

router.use(express.static(path.join(__dirname, "public")));
router.use(dashboardRouter);

export default router;
