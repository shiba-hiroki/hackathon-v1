import { z } from "@hono/zod-openapi";

const shiftTime = z.array(
	z.tuple([
		z.string().datetime().describe("startTime"),
		z.string().datetime().describe("endTime"),
	]),
);

export const UpdateShiftRequestInMonthSchema = shiftTime
	.describe("ある月のシフト希望が送られることを想定")
	.openapi("UpdateShiftRequestInMonthSchema");

export const GetConfirmedInMonthRequestQuery = z.object({
	year: z.string().openapi({ param: { in: "query" } }),
	month: z.string().openapi({ param: { in: "query" } }),
});

export const GetConfirmedInMonthResponseSchema = z
	.array(
		z.object({
			userID: z.number(),
			shiftTime: shiftTime,
		}),
	)
	.openapi("GetConfirmedInMonthResponseSchema");
