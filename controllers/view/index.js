import express from "express";
import path from "path";
import { __dirname } from "../../utils/fsUtils.js";

// Import view routers
import dashboardRouter from "./dashboardRouter.js";
import publicRouter from "./publicRouter.js";

/**
 * Express router for view routes
 * @const router
 */
const router = express.Router();

router.use(express.static(path.join(__dirname, "public")));

router.use(dashboardRouter);
router.use(publicRouter);

export default router;
