import { z } from "@hono/zod-openapi";
import { IOStime } from "../../util/time/iso";

const shiftTime = z.array(
	z.tuple([IOStime.describe("startTime"), IOStime.describe("endTime")]),
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
			shiftTime: z.array(z.array(IOStime)), // tupleにするとエラーが出るのでarrayにしている
		}),
	)
	.openapi("GetConfirmedInMonthResponseSchema");
