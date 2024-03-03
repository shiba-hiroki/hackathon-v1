import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { EmployerSecurity, ErrorResponse } from "../../util/schema";
import {
	UserIDPathParam,
	UserListResponseSchema,
	UserRegistrationRequestSchema,
	UserResponseSchema,
} from "./schema";

export const UserListRouter = createRoute({
	method: "get",
	path: "/api/employer/user",
	responses: {
		[StatusCodes.OK]: {
			content: {
				[MIME.json]: {
					schema: UserListResponseSchema,
				},
			},
			description: "successfully get user list",
		},
		...ErrorResponse,
	},
	...EmployerSecurity,
});

export const UserDeleteRouter = createRoute({
	method: "delete",
	path: "/api/employer/user/{id}",
	request: {
		params: UserIDPathParam,
	},
	responses: {
		[StatusCodes.NO_CONTENT]: {
			description: "successfully delete the user",
		},
		...ErrorResponse,
	},
	...EmployerSecurity,
});

export const UserRegistrationRouter = createRoute({
	method: "post",
	path: "/api/employer/user",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: UserRegistrationRequestSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			content: {
				[MIME.json]: {
					schema: UserResponseSchema,
				},
			},
			description: "successfully registered the user",
		},
		...ErrorResponse,
	},
	...EmployerSecurity,
});
