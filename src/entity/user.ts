import z from "zod";

const UserCrate = z.object({
	id: z.string(),
	name: z.string(),
	type: z.enum(["employer", "employee"]),
	hashed_password: z.string(),
	hourly_wage: z.number().nullable(),
});

export type UserCrate = z.infer<typeof UserCrate>;

export const parseAsUserCreate = (data: unknown): User | Error => {
	const validationResponse = User.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};

const User = z.object({
	id: z.string(),
	name: z.string(),
	type: z.enum(["employer", "employee"]),
	hourly_wage: z.number(),
});

export type User = z.infer<typeof User>;

export const parseAsUser = (data: unknown): User | Error => {
	const validationResponse = User.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
