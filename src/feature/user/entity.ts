import z from "zod";

export const UserType = z.enum(["employer", "employee"]);

export type UserType = z.infer<typeof UserType>

const User = z.object({
	id: z.number(),
	name: z.string(),
	type: UserType,
});

export type User = z.infer<typeof User>;

const UserWithHashedPassword = User.extend({
	hashedPassword: z.string(),
});

export type UserWithHashedPassword = z.infer<typeof UserWithHashedPassword>;

const UserCreate = z.object({
	name: z.string(),
	type: UserType,
	hashedPassword: z.string(),
});

export type UserCrate = z.infer<typeof UserCreate>;
