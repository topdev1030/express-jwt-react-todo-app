import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostEntity, UserEntity } from "../entities";
import { Env } from "../env";

export const AppDataSouce = new DataSource({
	type: "mysql",
	database: Env.dbName,
	host: Env.host,
	username: Env.username,
	password: Env.password,
	port: Env.dbPort,
	synchronize: true, // Enable only in development!
	logging: false,
	entities: [UserEntity, PostEntity],
	entitySkipConstructor: true,
	namingStrategy: new SnakeNamingStrategy(),
});
