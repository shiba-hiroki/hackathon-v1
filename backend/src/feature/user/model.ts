import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserModel = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").unique().notNull(),
	type: text("type", { enum: ["employer", "employee"] }).notNull(),
	hashedPassword: text("hashed_password").notNull(),
});
