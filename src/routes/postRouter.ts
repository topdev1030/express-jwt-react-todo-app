import { Router } from "express";
import passport from "passport";
import { createPost, getAllPosts } from "../controllers/Post";

const postRouter = Router();

postRouter.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	getAllPosts
);

postRouter.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	createPost
);

export { postRouter };
