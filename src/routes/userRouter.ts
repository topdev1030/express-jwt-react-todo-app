import { Router } from "express";
import passport from "passport";

import { getCurrentUser, getAllUsers, getUserById } from "../controllers/User";

export const userRouter = Router();

userRouter.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	getCurrentUser
);

userRouter.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	getAllUsers
);

userRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	getUserById
);
