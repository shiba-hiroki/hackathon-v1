import { z } from "zod";

const hashedPasswordModel = z.object({
	id: z.string(),
	hashed_password: z.string(),
});

export type hashedPasswordModel = z.infer<typeof hashedPasswordModel>;

export const parseAsHashedPasswordModel = (
	data: unknown,
): hashedPasswordModel | Error => {
	const validationResponse = hashedPasswordModel.safeParse(data);
	return validationResponse.success
		? validationResponse.data
		: validationResponse.error;
};
