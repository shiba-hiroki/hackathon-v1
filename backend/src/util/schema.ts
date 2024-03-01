import { z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "./mime";

export const ErrorMessageSchema = z.object({
	message: z.string(),
});

export const ErrorResponse = {
	[StatusCodes.BAD_REQUEST]: {
		content: {
			[MIME.json]: {
				schema: ErrorMessageSchema,
			},
		},
		description: "bad request",
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
};
