import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorMessageSchema } from "../../util/schema";
import { LoginRequestSchema, LoginResPonseSchema } from "./schema";

export const EmployerLoginRouter = createRoute({
	method: "post",
	path: "/api/login/employer",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: LoginRequestSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			description: "login succeeded",
		},
		[StatusCodes.UNAUTHORIZED]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "unauthorized",
		},
		[StatusCodes.NOT_FOUND]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "user not found",
		},
		[StatusCodes.INTERNAL_SERVER_ERROR]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "internal server error",
		},
	},
});

export const EmployeeLoginRouter = createRoute({
	method: "post",
	path: "/api/login/employee",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: LoginRequestSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			content: {
				[MIME.json]: {
					schema: LoginResPonseSchema,
				},
			},
			description: "login succeeded",
		},
		[StatusCodes.UNAUTHORIZED]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "unauthorized",
		},
		[StatusCodes.NOT_FOUND]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "user not found",
		},
		[StatusCodes.INTERNAL_SERVER_ERROR]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "internal server error",
		},
	},
});
