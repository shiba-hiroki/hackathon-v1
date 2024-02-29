import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema";
import { UserRepository } from "./interface";
import { UserModel } from "./model";

export const useUserRepository = (db: D1Database): UserRepository => {
	const connection = drizzle(db, { schema });

	return {
		async findByID(id: number) {
			return connection.query.UserModel.findFirst({
				where: eq(UserModel.id, id),
			});
		},
		async findByName(name) {
			return connection.query.UserModel.findFirst({
				where: eq(UserModel.name, name),
			});
		},
		async crate(userCreate) {
			return connection
				.insert(schema.UserModel)
				.values({
					name: userCreate.name,
					type: userCreate.type,
					hashedPassword: userCreate.hashedPassword,
				})
				.returning()
				.get();
		},
	};
};
