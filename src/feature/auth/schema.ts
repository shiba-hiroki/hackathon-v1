import { z } from "@hono/zod-openapi";

export const LoginRequestSchema = z
	.object({
		name: z.string(),
		password: z.string(),
	})
	.openapi("LoginRequestSchema");

export const LoginResPonseSchema = z
	.object({
		sessionID: z.string(),
	})
	.openapi("LoginResPonseSchema");
