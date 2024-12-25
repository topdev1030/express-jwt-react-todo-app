import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { options } from "./options";
import { UserEntity } from "../entities";
import { AppDataSouce } from "../db";

interface JwtPayload {
	id: string;
}

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Bearer header
	secretOrKey: options.secretOrKey,
};

const userRepository = AppDataSouce.getRepository(UserEntity);

const configureJwtStrategy = (passport: typeof import("passport")) => {
	// JWT strategy for token validation
	passport.use(
		new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
			userRepository
				.findOne({ where: { uuid: jwtPayload.id } })
				.then((user) => {
					console.log("user: ", user);
					if (user) {
						return done(null, user);
					}

					return done(null, false, {
						error: "Invalid token or user not found",
					});
				})
				.catch((error) => console.log(error));
		})
	);
};

export default configureJwtStrategy;
