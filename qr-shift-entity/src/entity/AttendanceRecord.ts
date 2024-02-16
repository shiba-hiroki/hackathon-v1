import z from "zod";

const AttendanceRecordParser = z.object({
  userID: z.string(),
  time: z.date(),
  state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

export type AttendanceRecord = z.infer<typeof AttendanceRecordParser>;

export const parseAsAttendanceRecord = (
  data: any,
): AttendanceRecord | Error => {
  const validationResponse = AttendanceRecordParser.safeParse(data);
  return validationResponse.success
    ? validationResponse.data
    : validationResponse.error;
};
