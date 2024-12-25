import { Request, Response } from "express";
import httpStatus from "http-status";
import { AppDataSouce } from "../../db";
import { UserEntity } from "../../entities";

const userRepository = AppDataSouce.getRepository(UserEntity);

const getCurrentUser = async (req: Request, res: Response) => {
	if (!req.user) {
		res.json({ error: "Unauthorized" }).status(httpStatus.UNAUTHORIZED);
	}

	res.json(req.user).status(httpStatus.OK);
};

const getAllUsers = async (req: Request, res: Response) => {
	await userRepository
		.find()
		.then((users) => {
			if (!users) {
				return res
					.json({ error: "No users found" })
					.status(httpStatus.NOT_FOUND);
			}

			res.json(users).status(httpStatus.OK);
		})
		.catch((err) => console.log(err));
};

const getUserById = async (req: Request, res: Response) => {
	await userRepository
		.findOneBy({ uuid: req.params.id })
		.then((user) => {
			if (!user) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No user found" });
			}

			res.status(httpStatus.OK).json(user);
		})
		.catch((err) => console.log(err));
};

export { getCurrentUser, getAllUsers, getUserById };
