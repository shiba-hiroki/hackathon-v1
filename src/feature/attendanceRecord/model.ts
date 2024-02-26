import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { UserModel } from "../user/model";

export const AttendanceRecordModel = sqliteTable(
	"attendance_records",
	{
		userID: integer("user_id", { mode: "number" }).references(
			() => UserModel.id,
		),
		time: text("time").notNull(),
		state: text("state", {
			enum: ["checkIn", "checkOut", "brakeStart", "brakeEnd"],
		}),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userID, table.time] }),
		};
	},
);
