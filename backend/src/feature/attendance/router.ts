import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { EmployeeSecurity, ErrorResponse } from "../../util/schema";
import { UserIDPathParam } from "../user/schema";
import {
	GetAttendanceInMonthResponseSchema,
	GetMyAttendanceInMonthRequestQuery,
} from "./schema";

export const GetAttendanceInMonthRouter = createRoute({
	method: "get",
	path: "/api/employer/attendance/{id}",
	request: {
		params: UserIDPathParam,
		query: GetMyAttendanceInMonthRequestQuery,
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				[MIME.json]: {
					schema: GetAttendanceInMonthResponseSchema,
				},
			},
			description: "successfully get attendance list",
		},
		...ErrorResponse,
	},
	...EmployeeSecurity,
});

export const GetMyAttendanceInMonthRouter = createRoute({
	method: "get",
	path: "/api/employee/attendance",
	request: {
		query: GetMyAttendanceInMonthRequestQuery,
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				[MIME.json]: {
					schema: GetAttendanceInMonthResponseSchema,
				},
			},
			description: "successfully get attendance list",
		},
		...ErrorResponse,
	},
	...EmployeeSecurity,
});
