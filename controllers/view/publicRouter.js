import express from "express";
import { pathFromRoot } from "../../utils/fsUtils.js";

/**
 * Express router for public routes
 * @const router
 */
const router = express.Router();

router.get("/", (_, res) => {
  res.sendFile(pathFromRoot("public", "splashpage.html"));
});

export default router;
