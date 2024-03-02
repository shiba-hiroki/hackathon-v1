import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { UserModel } from "../user/model";

export const ShiftRequestModel = sqliteTable(
	"shift_requests",
	{
		userID: integer("user_id", { mode: "number" })
			.references(() => UserModel.id)
			.notNull(),
		startTime: text("start_time").notNull(),
		endTime: text("end_time").notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userID, table.startTime] }),
		};
	},
);

export const ConfirmedShiftModel = sqliteTable(
	"confirmed_shifts",
	{
		userID: integer("user_id", { mode: "number" })
			.references(() => UserModel.id)
			.notNull(),
		startTime: text("start_time").notNull(),
		endTime: text("end_time").notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userID, table.startTime] }),
		};
	},
);
