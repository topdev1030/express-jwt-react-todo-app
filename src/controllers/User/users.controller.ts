import { Request, Response } from "express";
import httpStatus from "http-status";
import { AppDataSouce } from "../../db";
import { UserEntity } from "../../entities";
import passport from "passport";

const getCurrentUser = async (req: Request, res: Response) => {
	if (!req.user) {
		res.json({ error: "Unauthorized" }).status(httpStatus.UNAUTHORIZED);
	}

	res.json(req.user).status(httpStatus.OK);
};

export { getCurrentUser };
