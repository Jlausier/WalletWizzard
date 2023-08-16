import express from "express";
import userRouter from "./userRouter.js";
import financeRouter from "./financeRouter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use(financeRouter);

export default router;
