import jwt from "jsonwebtoken";
import { Env } from "../env";
// types
import { PayloadForToken } from "../types";

export const generateToken = (payload: PayloadForToken) => {
	const { secretKey, expiresIn } = Env;
	return `Bearer ${jwt.sign({ payload }, secretKey || "express", {
		expiresIn,
	})}`;
};
