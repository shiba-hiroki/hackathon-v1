import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { MIME } from "../../util/mime";
import { EmployeeSecurity, ErrorResponse } from "../../util/schema";
import {
	GetEmployeeAttendanceInMonthRequestQuery,
	GetAttendanceInMonthResponseSchema,
} from "./schema";

export const GetEmployeeAttendanceInMonthRouter = createRoute({
	method: "get",
	path: "/api/employee/attendance",
	request: {
		query: GetEmployeeAttendanceInMonthRequestQuery,
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
