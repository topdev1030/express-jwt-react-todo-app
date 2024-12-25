import { Request, Response } from "express";
import httpStatus from "http-status";
// services
import { userService } from "../../services";
// utils
import {
	generateToken,
	comparePassword,
	errorHandlerWrapper,
} from "../../utils";
// types
import { PayloadForToken } from "../../types";

const loginHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// find user then check if it exists in database
	const findUser = await userService.getOneUser({ email });
	if (!findUser)
		return res.json({ error: "User not found" }).status(httpStatus.NOT_FOUND);

	// check if user has been already deleted
	if (findUser.deletedAt)
		return res
			.json({ error: "User has been suspended" })
			.status(httpStatus.NOT_FOUND);

	// check if password is correct
	const compare = await comparePassword(password, findUser.password);
	if (!compare)
		return res
			.json({ error: "Password incorrect" })
			.status(httpStatus.BAD_REQUEST);

	// if all passed, generate token
	const payload: PayloadForToken = {
		id: findUser.uuid,
		email: findUser.email,
		username: findUser.username,
	};
	const token = generateToken(payload);
	res.json({ token }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
