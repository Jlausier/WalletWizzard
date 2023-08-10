import express from "express";
import apiRouter from "./api/index.js";
import viewRouter from "./view/index.js";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/", viewRouter);

export default router;
