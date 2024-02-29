import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorMessageSchema } from "../../util/schema";
import { sessionCookieName } from "../auth/const";
import {
	UserRegistrationRequestSchema,
	UserRegistrationResponseSchema,
} from "./schema";

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
					schema: UserRegistrationResponseSchema,
				},
			},
			description: "Successfully registered the user",
		},
		[StatusCodes.UNAUTHORIZED]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "unauthorized",
		},
		[StatusCodes.FORBIDDEN]: {
			content: {
				[MIME.json]: {
					schema: ErrorMessageSchema,
				},
			},
			description: "not employer",
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
	security: [{ type: ["apiKey"], in: ["cookie"], name: [sessionCookieName] }],
});
