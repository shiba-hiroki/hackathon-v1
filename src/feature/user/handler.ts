import { RouteHandler } from "@hono/zod-openapi";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { hashedPassword } from "../../util/hash";
import { UserRepository } from "./interface";
import { UserRegistrationRouter } from "./router";

export const useUserRegistrationHandler =
	(
		userRepositoryFactory: (c: Context) => UserRepository,
		encryptionKeyFactory: (c: Context) => string,
		initializationVectorFactory: (c: Context) => string,
	): RouteHandler<typeof UserRegistrationRouter> =>
	async (c) => {
		const { name, type, password } = c.req.valid("json");

		const user = await userRepositoryFactory(c).crate({
			name,
			type,
			hashedPassword: await hashedPassword(
				initializationVectorFactory(c),
				encryptionKeyFactory(c),
				password,
			),
		});

		return c.json(
			{ name: user.name, id: user.id, type: user.type },
			StatusCodes.CREATED,
		);
	};
