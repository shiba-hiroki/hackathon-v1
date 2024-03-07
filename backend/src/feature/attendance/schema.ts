import { z } from "@hono/zod-openapi";
import { ISOtime } from "../../util/time/iso";

const Attendance = z.object({
	time: ISOtime,
	state: z.enum(["checkIn", "checkOut", "breakStart", "breakEnd"]),
});

export const GetMyAttendanceInMonthRequestQuery = z.object({
	year: z.string().openapi({ param: { in: "query" } }),
	month: z.string().openapi({ param: { in: "query" } }),
});

export const GetAttendanceInMonthResponseSchema = z
	.object({
		userID: z.number(),
		attendances: z.array(Attendance),
	})
	.openapi("GetAttendanceInMonthResponseSchema");
