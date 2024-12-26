import { Router } from "express";

import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";
import { postRouter } from "./postRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
