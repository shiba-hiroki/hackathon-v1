import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { UserModel } from "../user/model";

export const AttendanceModel = sqliteTable(
	"attendance",
	{
		userID: integer("user_id", { mode: "number" })
			.references(() => UserModel.id, { onDelete: "cascade" })
			.notNull(),
		time: text("time").notNull(),
		state: text("state", {
			enum: ["checkIn", "checkOut", "breakStart", "breakEnd"],
		}).notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userID, table.time] }),
		};
	},
);
