import { OpenAPIHono } from "@hono/zod-openapi";

type Bindings = {
	DB: D1Database;
	KV: KVNamespace;
	ENCRYPTION_KEY: string;
	INITIALIZATION_VECTOR: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
	return c.text(
		"I thought what I'd do was, I'd pretend I was one of those deaf-mutes",
	);
});

export default app;
