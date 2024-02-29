import z from "zod";

const Shift = z.object({
	startTime: z.date(),
	endTime: z.date(),
});

export type ShiftRequest = z.infer<typeof Shift>;

export const parseAsShiftRequest = (data: unknown): ShiftRequest | Error => {
	const validationResponse = Shift.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};

export type ConfirmedShift = z.infer<typeof Shift>;

export const parseAsConfirmedShift = (
	data: unknown,
): ConfirmedShift | Error => {
	const validationResponse = Shift.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
