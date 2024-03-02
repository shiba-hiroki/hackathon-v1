import z from "zod";
import { IOStime } from "../../util/time/iso";

const AttendanceRecord = z.object({
	time: IOStime,
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

const AttendanceRecordList = z.object({
	userID: z.number(),
	Attendances: z.array(AttendanceRecord),
});

export type AttendanceRecord = z.infer<typeof AttendanceRecord>;

export type AttendanceRecordList = z.infer<typeof AttendanceRecordList>;
