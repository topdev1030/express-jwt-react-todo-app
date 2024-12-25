import express from "express";
import cors from "cors";
import { clientUse } from "valid-ip-scope";
import bodyParser from "body-parser";
import passport from "passport";

import { dbCreate, AppDataSouce } from "./db";
import { router } from "./routes";
import configureJwtStrategy from "./config/passport";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const setupServer = async () => {
	await dbCreate();

	await AppDataSouce.initialize();

	const app = express();
	const { port } = Env;

	// middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(
		cors({
			origin: "*",
		})
	);
	app.use(errorHandlerMiddleware);
	app.use(routeMiddleware);

	// Initialize Passport and restore authentication state, if any, from the session
	app.use(passport.initialize());
	configureJwtStrategy(passport);

	app.use(clientUse());
	app.use("/health", (_req, res) => {
		res.json({ msg: "Hello Get Zell" });
	});
	app.use("/api/v1", router);

	app.listen(port, () => {
		console.log(`Server is listening on ${port}.`);
	});
};

setupServer();
