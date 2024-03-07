import z from "zod";
import { ISOtime } from "../../util/time/iso";

const Shift = z.object({
	userID: z.number(),
	shiftTime: z.array(
		z.tuple([ISOtime.describe("startTime"), ISOtime.describe("endTime")]),
	),
});

export type ShiftRequest = z.infer<typeof Shift>;

export type ConfirmedShift = z.infer<typeof Shift>;
