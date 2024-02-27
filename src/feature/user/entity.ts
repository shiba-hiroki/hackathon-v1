import z from "zod";

const User = z.object({
	id: z.number(),
	name: z.string(),
	type: z.enum(["employer", "employee"]),
});

export type User = z.infer<typeof User>;

export const parseAsUser = (data: unknown): User | Error => {
	const validationResponse = User.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};

const UserWithHashedPassword = User.extend({
	hashedPassword: z.string(),
});

export type UserCrate = z.infer<typeof UserWithHashedPassword>;
export type UserWithHashedPassword = z.infer<typeof UserWithHashedPassword>;

export const parseAsUserCreate = (data: unknown): User | Error => {
	const validationResponse = User.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
