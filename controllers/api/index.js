import express from "express";
import userRouter from "./userRouter.js";
import chartRoutes from "./chartRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/", chartRoutes);

export default router;
