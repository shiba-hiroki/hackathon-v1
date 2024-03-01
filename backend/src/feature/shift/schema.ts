import { z } from "@hono/zod-openapi";

export const ShiftRequestSchema = z
	.array(
		z.tuple([z.date().describe("startTime"), z.date().describe("endTime")]),
	)
	.describe("ある月のシフト希望が送られることを想定")
	.openapi("ShiftRequestSchema");
