import { z } from "@hono/zod-openapi";
import { ISOtime } from "../../util/time/iso";

const shiftTime = z.array(
	z.tuple([ISOtime.describe("startTime"), ISOtime.describe("endTime")]),
);

const shiftInMonthSchema = z
	.array(
		z.object({
			userID: z.number(),
			shiftTime: z.array(z.array(ISOtime)), // tupleにするとエラーが出るのでarrayにしている
		}),
	)
	.openapi("ShiftInMonthResponseSchema");

export const ListShiftRequestInMonthSchema = shiftInMonthSchema;

export const ListShiftRequestInMonthRequestQuery = z.object({
	year: z.string().openapi({ param: { in: "query" } }),
	month: z.string().openapi({ param: { in: "query" } }),
});

export const UpdateShiftRequestInMonthSchema = shiftTime
	.describe("ある月のシフト希望が送られることを想定")
	.openapi("UpdateShiftRequestInMonthSchema");

export const UpdateConfirmedShiftInMonthSchema = shiftInMonthSchema;

export const GetConfirmedInMonthRequestQuery = z.object({
	year: z.string().openapi({ param: { in: "query" } }),
	month: z.string().openapi({ param: { in: "query" } }),
});

export const GetConfirmedInMonthResponseSchema = shiftInMonthSchema;

export const GetMyConfirmedInMonthResponseSchema = z.array(z.array(ISOtime)); // tupleにするとエラーが出るのでarrayにしている
