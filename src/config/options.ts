import { Env } from "../env";

export const options = {
	secretOrKey: Env.secretKey || "secret",
};
