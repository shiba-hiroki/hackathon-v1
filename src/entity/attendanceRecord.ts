import z from "zod";

const AttendanceRecord = z.object({
	userID: z.string(),
	time: z.date(),
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

export type AttendanceRecord = z.infer<typeof AttendanceRecord>;

export const parseAsAttendanceRecord = (
	data: unknown,
): AttendanceRecord | Error => {
	const validationResponse = AttendanceRecord.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
