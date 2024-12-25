import { Router } from "express";
import passport from "passport";

import { getCurrentUser } from "../controllers/User";

export const userRouter = Router();

userRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	getCurrentUser
);
