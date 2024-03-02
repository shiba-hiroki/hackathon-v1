import { and, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema";
import { ToISOPrefixYearAndMonth } from "../../util/time/iso";
import { AttendanceRepository } from "./interface";

export const useAttendanceRepository = (
	db: D1Database,
): AttendanceRepository => {
	const connection = drizzle(db, { schema });
	return {
		async listInMonth(userID, year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			const attendances = await connection
				.select()
				.from(schema.AttendanceModel)
				.where(
					and(
						eq(schema.AttendanceModel.userID, userID),
						like(schema.AttendanceModel.time, prefix),
					),
				);
			return {
				userID,
				attendances: attendances.map((a) => {
					return { time: a.time, state: a.state };
				}),
			};
		},
		async insert(userID, attendance) {
			await connection.insert(schema.AttendanceModel).values({
				userID,
				state: attendance.state,
				time: attendance.time,
			});
		},
	};
};
