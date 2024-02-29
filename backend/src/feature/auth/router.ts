import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorMessageSchema } from "../../util/schema";
import { LoginRequestSchema, LoginResPonseSchema } from "./schema";

export const LoginRouter = createRoute({
	method: "post",
	path: "/api/login",
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
