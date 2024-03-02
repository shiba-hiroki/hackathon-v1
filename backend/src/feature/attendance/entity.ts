import z from "zod";
import { IOStime } from "../../util/time/iso";

const Attendance = z.object({
	time: IOStime,
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

const AttendanceList = z.object({
	userID: z.number(),
	attendances: z.array(Attendance),
});

export type Attendance = z.infer<typeof Attendance>;

export type AttendanceList = z.infer<typeof AttendanceList>;
