import z from "zod";

const ShiftParser = z.object({
	userID: z.string(),
	startTime: z.date(),
	endTime: z.date(),
});

export type ShiftRequest = z.infer<typeof ShiftParser>;

export const parseAsShiftRequest = (data: unknown): ShiftRequest | Error => {
	const validationResponse = ShiftParser.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};

export type ConfirmedShift = z.infer<typeof ShiftParser>;

export const parseAsConfirmedShift = (
	data: unknown,
): ConfirmedShift | Error => {
	const validationResponse = ShiftParser.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
