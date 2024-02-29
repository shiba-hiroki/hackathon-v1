import { z } from "@hono/zod-openapi";

export const ErrorMessageSchema = z.object({
	message: z.string(),
});
