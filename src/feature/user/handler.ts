import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import {
	encryptionKeyFactory,
	initializationVectorFactory,
	userRepositoryFactory,
} from "../../factoryType";
import { hashedPassword } from "../../util/hash";
import { UserRegistrationRouter } from "./router";

export const useUserRegistrationHandler =
	(
		userRepositoryFactory: userRepositoryFactory,
		encryptionKeyFactory: encryptionKeyFactory,
		initializationVectorFactory: initializationVectorFactory,
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
