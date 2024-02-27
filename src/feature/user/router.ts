import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorMessageSchema } from "../../util/schema";
import {
	EmployeeRegistrationRequestSchema,
	EmployeeRegistrationResponseSchema,
} from "./schema";

export const EmployeeRegistrationRouter = createRoute({
	method: "post",
	path: "api/employer/employee",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: EmployeeRegistrationRequestSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			content: {
				[MIME.json]: {
					schema: EmployeeRegistrationResponseSchema,
				},
			},
			description: "Successfully registered the employee",
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
});
