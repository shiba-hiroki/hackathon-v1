import { z } from "@hono/zod-openapi";
import { IOStime } from "../../util/time/iso";

const Attendance = z.object({
	time: IOStime,
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

export const GetEmployeeAttendanceInMonthRequestQuery = z.object({
	year: z.string().openapi({ param: { in: "query" } }),
	month: z.string().openapi({ param: { in: "query" } }),
});

export const GetAttendanceInMonthResponseSchema = z
	.object({
		userID: z.number(),
		attendances: z.array(Attendance),
	})
	.openapi("GetAttendanceInMonthResponseSchema");
