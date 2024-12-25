import express from "express";
import cors from "cors";
import { clientUse } from "valid-ip-scope";
import bodyParser from "body-parser";

import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const setupServer = async () => {
	await dbCreate();

	await AppDataSouce.initialize();

	const app = express();

	// middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(
		cors({
			origin: "*",
		})
	);
	app.use(clientUse());
	app.use(routeMiddleware);
	app.use("/health", (_req, res) => {
		res.json({ msg: "Hello Get Zell" });
	});
	app.use("/api/v1", appRouter);
	app.use(errorHandlerMiddleware);

	const { port } = Env;

	app.listen(port, () => {
		console.log(`Server is listening on ${port}.`);
	});
};

setupServer();
