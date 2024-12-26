import { Router } from "express";
import passport from "passport";

import {
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
} from "../controllers/User";

export const userRouter = Router();

userRouter.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	getAllUsers
);

userRouter.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	getCurrentUser
);

userRouter.post(
	"/current/update",
	passport.authenticate("jwt", { session: false }),
	updateCurrentUser
);

userRouter.delete(
	"/current/delete",
	passport.authenticate("jwt", { session: false }),
	deleteCurrentUser
);

userRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	getUserById
);

userRouter.post(
	"/update/:id",
	passport.authenticate("jwt", { session: false }),
	updateUserById
);

userRouter.delete(
	"/delete/:id",
	passport.authenticate("jwt", { session: false }),
	deleteUserById
);
