import { Request, Response } from "express";
import httpStatus from "http-status";

import { AppDataSouce } from "../../db";
import { PostEntity, UserEntity } from "../../entities";
import { relative } from "path";

const postRepository = AppDataSouce.getRepository(PostEntity);
const userRepository = AppDataSouce.getRepository(UserEntity);

const getAllPosts = async (req: Request, res: Response) => {
	await postRepository
		.find()
		.then((posts) => {
			if (!posts) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No posts found" });
			}

			res.status(httpStatus.OK).json(posts);
		})
		.catch((err) => console.log(err));
};

const getPostById = async (req: Request, res: Response) => {
	await postRepository
		.findOne({
			where: { uuid: req.params.post_id, user: { uuid: req.params.user_id } },
		})
		.then((post) => {
			if (!post) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No post found" });
			}

			res.status(httpStatus.OK).json(post);
		})
		.catch((err) => console.log(err));
};

const updatePostById = async (req: Request, res: Response) => {
	await postRepository
		.findOne({
			where: { uuid: req.params.post_id, user: { uuid: req.params.user_id } },
		})
		.then((post) => {
			if (!post) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No post found" });
			}

			// update post
			const { title, content } = req.body;
			post.title = title || post.title;
			post.content = content || post.content;

			postRepository.save(post);
			res.status(httpStatus.OK).json(post);
		})
		.catch((err) => console.log(err));
};

const deletePostById = async (req: Request, res: Response) => {
	await postRepository
		.findOne({
			where: { uuid: req.params.post_id, user: { uuid: req.params.user_id } },
		})
		.then((post) => {
			if (!post) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No post found" });
			}

			// delete post
			postRepository.remove(post);
			res.status(httpStatus.OK).json({ success: true });
		})
		.catch((err) => console.log(err));
};

const createPost = async (req: Request, res: Response) => {
	const { uuid } = req.user as { uuid: string };
	await userRepository
		.findOneBy({ uuid: uuid })
		.then(async (user) => {
			if (!user) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "User not found" });
			}

			const newPost = req.body;
			newPost.user = user;
			// Save the new Post
			await postRepository.save(newPost);

			// Retrieve all posts for the user
			const allPosts = await postRepository.find({
				where: { user: { uuid: uuid } },
			});
			res.status(httpStatus.OK).json(allPosts);
		})
		.catch((err) => console.log(err));
};

export { getAllPosts, createPost, getPostById, updatePostById, deletePostById };
