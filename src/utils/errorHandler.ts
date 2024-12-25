import { ArgumentValidationError } from "../errors";
import { NextFunction, Response, Request } from "express";
const { ValidationError, validationResult } = require("express-validator");

export const errorHandlerWrapper = (
	func: (req: Request, res: Response, next: NextFunction) => void
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new ArgumentValidationError(
					"Arguments are invalid.",
					errors.array().map((error: typeof ValidationError) => error.msg)
				);
			}
			func(req, res, next);
		} catch (err: unknown) {
			next(err);
		}
	};
};
