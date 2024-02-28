import { z } from "@hono/zod-openapi";
import { UserType } from "./entity";

export const EmployeeRegistrationRequestSchema = z
	.object({
		name: z.string(),
		password: z.string().min(8).max(256),
	})
	.openapi("EmployeeRegisterSchema");

export const EmployeeRegistrationResponseSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		type: UserType,
	})
	.openapi("EmployeeRegisterSchema");

export const resetUserPasswordRequestSchema = z
	.object({
		password: z.string().min(8).max(256),
	})
	.openapi("resetUserPasswordSchema");
