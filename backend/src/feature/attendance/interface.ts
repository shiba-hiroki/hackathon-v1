import { Attendance, AttendanceList } from "./entity";

export interface AttendanceRepository {
	listInMonth(
		userID: number,
		year: string,
		month: string,
	): Promise<AttendanceList>;
	insert(userID: number, attendance: Attendance): Promise<void>;
}
