import { RouteHandler } from "@hono/zod-openapi";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { hashedPassword } from "../../util/hash";
import { UserRepository } from "./interface";
import { EmployeeRegistrationRouter } from "./router";

export const useEmployeeRegistrationHandler =
	(
		userRepositoryFactory: (c: Context) => UserRepository,
		encryptionKeyFactory: (c: Context) => string,
		initializationVectorFactory: (c: Context) => string,
	): RouteHandler<typeof EmployeeRegistrationRouter> =>
	async (c) => {
		const { name, password } = c.req.valid("json");

		const user = await userRepositoryFactory(c).crate({
			name,
			type: "employee",
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
