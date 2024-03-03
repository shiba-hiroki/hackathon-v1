import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import {
	EncryptionKeyFactory,
	InitializationVectorFactory,
	UserRepositoryFactory,
} from "../../factoryType";
import { hashedPassword } from "../../util/hash";
import {
	UserDeleteRouter,
	UserListRouter,
	UserRegistrationRouter,
} from "./router";

export const useUserListHandler =
	(
		userRepositoryFactory: UserRepositoryFactory,
	): RouteHandler<typeof UserListRouter> =>
	async (c) => {
		const users = await userRepositoryFactory(c).list();

		return c.json(
			users.map((user) => {
				return {
					id: user.id,
					name: user.name,
					type: user.type,
				};
			}),
			StatusCodes.OK,
		);
	};

export const useUserRegistrationHandler =
	(
		userRepositoryFactory: UserRepositoryFactory,
		encryptionKeyFactory: EncryptionKeyFactory,
		initializationVectorFactory: InitializationVectorFactory,
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

export const useUserDeleteHandler =
	(
		userRepositoryFactory: UserRepositoryFactory,
	): RouteHandler<typeof UserDeleteRouter> =>
	async (c) => {
		const { id } = c.req.param();

		await userRepositoryFactory(c).delete(Number(id));

		return c.json(StatusCodes.NO_CONTENT);
	};
