import jwt from "jsonwebtoken";
import { Env } from "../env";
import { options } from "../config/options";

export const generateToken = (payload) => {
	const { expiresIn } = Env;
	return `Bearer ${jwt.sign({ payload }, options.secretOrKey, {
		expiresIn,
	})}`;
};
