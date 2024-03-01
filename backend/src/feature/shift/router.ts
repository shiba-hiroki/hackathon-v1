import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorResponse } from "../../util/schema";
import { ShiftRequestSchema } from "./schema";

export const UpdateShiftRequestRouter = createRoute({
	method: "patch",
	path: "/api/employer/shift/request",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: ShiftRequestSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			description: "successfully update shift request",
		},
		...ErrorResponse,
	},
	security: [{ type: ["Bearer"], in: ["headers"] }],
});
