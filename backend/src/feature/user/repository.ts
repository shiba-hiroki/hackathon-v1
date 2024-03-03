import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema";
import { UserRepository } from "./interface";
import { UserModel } from "./model";

export const useUserRepository = (db: D1Database): UserRepository => {
	const connection = drizzle(db, { schema });

	return {
		async findByID(id: number) {
			const user = await connection.query.UserModel.findFirst({
				where: eq(UserModel.id, id),
			});
			if (user == null) return undefined;
			return { id: user.id, type: user.type, name: user.name };
		},
		async findByName(name) {
			const user = await connection.query.UserModel.findFirst({
				where: eq(UserModel.name, name),
			});
			if (user == null) return undefined;
			return {
				id: user.id,
				type: user.type,
				name: user.name,
				hashedPassword: user.hashedPassword,
			};
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
		async delete(userID) {
			await connection
				.delete(schema.UserModel)
				.where(eq(schema.UserModel.id, userID));
		},
		async list() {
			return connection.query.UserModel.findMany({});
		},
	};
};
