import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { ErrorResponse, UserSecurity } from "../../util/schema";
import {
	GetConfirmedInMonthRequestQuery,
	GetConfirmedInMonthResponseSchema,
	UpdateShiftRequestInMonthSchema,
} from "./schema";

export const UpdateShiftRequestInMonthRouter = createRoute({
	method: "patch",
	path: "/api/employer/shift-request",
	request: {
		body: {
			content: {
				[MIME.json]: {
					schema: UpdateShiftRequestInMonthSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.OK]: {
			description: "successfully update shift request",
		},
		...ErrorResponse,
	},
	security: [{ type: ["Bearer"], in: ["headers"] }],
});

export const GetConfirmedInMonthRouter = createRoute({
	method: "get",
	path: "/api/user/confirmed-shift",
	request: {
		query: GetConfirmedInMonthRequestQuery,
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				[MIME.json]: {
					schema: GetConfirmedInMonthResponseSchema,
				},
			},
			description: "successfully update shift request",
		},
		...ErrorResponse,
	},
	...UserSecurity,
});
