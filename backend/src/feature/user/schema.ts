import { z } from "@hono/zod-openapi";
import { UserType } from "./entity";

export const UserIDPathParam = z.object({
	id: z.string().openapi({
		param: {
			name: "id",
			in: "path",
		},
	}),
});

export const UserRegistrationRequestSchema = z
	.object({
		name: z.string(),
		type: UserType,
		password: z.string().min(8).max(256),
	})
	.openapi("UserRegisterRequestSchema");

export const UserResponseSchema = z
	.object({
		id: z.number(),
		type: UserType,
		name: z.string(),
	})
	.openapi("UserResponseSchema");

export const UserListResponseSchema = z
	.array(UserResponseSchema)
	.openapi("UserListResponseSchema");
