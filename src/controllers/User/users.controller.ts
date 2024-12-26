import { Request, Response } from "express";
import httpStatus from "http-status";
import { AppDataSouce } from "../../db";
import { UserEntity } from "../../entities";

const userRepository = AppDataSouce.getRepository(UserEntity);

const getCurrentUser = async (req: Request, res: Response) => {
	res.json(req.user).status(httpStatus.OK);
};

const updateCurrentUser = async (req: Request, res: Response) => {
	// Extract the uuid property
	const { uuid } = req.user as { uuid: string };
	userRepository
		.findOneBy({ uuid: uuid })
		.then((user) => {
			// Update user fields with requested data
			const userData = req.body;
			user = { ...user, ...userData };

			// Save the updated user back to the database
			userRepository.save(user);
			res.status(httpStatus.OK).json(user);
		})
		.catch((err) => console.log(err));
	res.json(req.user).status(httpStatus.OK);
};

const deleteCurrentUser = async (req: Request, res: Response) => {
	// Extract the uuid property
	const { uuid } = req.user as { uuid: string };
	userRepository
		.delete({ uuid: uuid })
		.then((success) => {
			res
				.status(httpStatus.OK)
				.json({ success: true, message: "User has been deleted sucess" });
		})
		.catch((err) => console.log(err));
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

const updateUserById = async (req: Request, res: Response) => {
	await userRepository
		.findOneBy({ uuid: req.params.id })
		.then((user) => {
			if (!user) {
				return res
					.status(httpStatus.NOT_FOUND)
					.json({ error: "No user found" });
			}

			// Update user fields with requested data
			const userData = req.body;
			user = { ...user, ...userData };

			// Save the updated user back to the database
			userRepository.save(user);
			res.status(httpStatus.OK).json(user);
		})
		.catch((err) => console.log(err));
};

const deleteUserById = async (req: Request, res: Response) => {
	await userRepository
		.delete(req.params.id)
		.then((success) =>
			res
				.status(httpStatus.OK)
				.json({ success: "User has been deleted Successfully" })
		)
		.catch((err) => console.log(err));
};

export {
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
