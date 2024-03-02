import z from "zod";

const Shift = z.object({
	userID: z.number(),
	shiftTime: z.array(
		z.tuple([
			z.string().datetime().describe("startTime"),
			z.string().datetime().describe("endTime"),
		]),
	),
});

export type ShiftRequest = z.infer<typeof Shift>;

export type ConfirmedShift = z.infer<typeof Shift>;
