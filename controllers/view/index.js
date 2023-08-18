import express from "express";
import { pathFromRoot } from "../../utils/fsUtils.js";

// Import view routers
import dashboardRouter from "./dashboardRouter.js";
import publicRouter from "./publicRouter.js";

/**
 * Express router for view routes
 * @const router
 */
const router = express.Router();

router.use(express.static(pathFromRoot("public")));

router.use(dashboardRouter);
router.use(publicRouter);

export default router;
