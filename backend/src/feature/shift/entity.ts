import z from "zod";
import { IOStime } from "../../util/time/iso";

const Shift = z.object({
	userID: z.number(),
	shiftTime: z.array(
		z.tuple([IOStime.describe("startTime"), IOStime.describe("endTime")]),
	),
});

export type ShiftRequest = z.infer<typeof Shift>;

export type ConfirmedShift = z.infer<typeof Shift>;
