import { z } from "@hono/zod-openapi";
import { UserType } from "./entity";

export const UserRegistrationRequestSchema = z
	.object({
		name: z.string(),
		type: UserType,
		password: z.string().min(8).max(256),
	})
	.openapi("UserRegisterRequestSchema");

export const UserRegistrationResponseSchema = z
	.object({
		id: z.number(),
		type: UserType,
		name: z.string(),
	})
	.openapi("UserRegisterResponseSchema");

export const resetUserPasswordRequestSchema = z
	.object({
		password: z.string().min(8).max(256),
	})
	.openapi("resetUserPasswordSchema");
