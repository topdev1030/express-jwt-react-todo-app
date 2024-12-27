import { Router } from "express";
import passport from "passport";
import {
	createPost,
	deletePostById,
	getAllPosts,
	getPostById,
	updatePostById,
} from "../controllers/Post";

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

postRouter.get(
	"/:user_id/:post_id",
	passport.authenticate("jwt", { session: false }),
	getPostById
);

postRouter.post(
	"/:user_id/:post_id",
	passport.authenticate("jwt", { session: false }),
	updatePostById
);

postRouter.delete(
	"/:user_id/:post_id",
	passport.authenticate("jwt", { session: false }),
	deletePostById
);

export { postRouter };
