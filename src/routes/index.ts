import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";
import { Router } from "express";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
