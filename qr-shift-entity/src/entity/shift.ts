import z from "zod";

const AttendanceRecordParser = z.object({
  userID: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export type AttendanceRecord = z.infer<typeof AttendanceRecordParser>;

export const parseAsAttendanceRecord = (data: any): AttendanceRecord | Error => {
  const validationResponse = AttendanceRecordParser.safeParse(data);
  return validationResponse.success
    ? validationResponse.data
    : validationResponse.error;
};
