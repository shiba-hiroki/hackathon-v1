import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { hashedPassword } from "../../util/hash";
import { UserRepository } from "./interface";
import { EmployeeRegistrationRouter } from "./router";

export const useEmployeeRegistrationHandler =
	(
		userRepository: UserRepository,
		encryptionKey: string,
		initializationVector: string,
	): RouteHandler<typeof EmployeeRegistrationRouter> =>
	async (c) => {
		const { name, password } = c.req.valid("json");

		const user = await userRepository.crate({
			name,
			type: "employee",
			hashedPassword: await hashedPassword(
				initializationVector,
				encryptionKey,
				password,
			),
		});

		return c.json(user, StatusCodes.CREATED);
	};
