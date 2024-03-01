import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { EmployerSecurity, ErrorResponse } from "../../util/schema";
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
			description: "successfully registered the user",
		},
		...ErrorResponse,
	},
	...EmployerSecurity,
});
