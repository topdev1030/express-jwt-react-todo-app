import { authRouter } from "./authRouter";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
