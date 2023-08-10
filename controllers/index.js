import express from "express";
import apiRoutes from "./api";
import homeRoutes from "./homeRoutes";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

export default router;
