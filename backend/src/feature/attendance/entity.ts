import z from "zod";
import { ISOtime } from "../../util/time/iso";

const Attendance = z.object({
	time: ISOtime,
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

const AttendanceList = z.object({
	userID: z.number(),
	attendances: z.array(Attendance),
});

export type Attendance = z.infer<typeof Attendance>;

export type AttendanceList = z.infer<typeof AttendanceList>;
