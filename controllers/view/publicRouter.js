import express from "express";
import path from "path";
import { __dirname } from "../../utils/fsUtils.js";

/**
 * Express router for public routes
 * @const router
 */
const router = express.Router();

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

export default router;
