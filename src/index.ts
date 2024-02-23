import { OpenAPIHono } from "@hono/zod-openapi";
import { Base64ToUint8Array } from "./util/arrayBuffer";

type Bindings = {
	DB: D1Database;
	KV: KVNamespace;
	ENCRYPTION_KEY: string;
	INITIALIZATION_VECTOR: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
	const password = "password";
	const rawKey = Base64ToUint8Array(c.env.ENCRYPTION_KEY);
	const iv = Base64ToUint8Array(c.env.INITIALIZATION_VECTOR);

	const key = (await crypto.subtle.importKey(
		"raw",
		rawKey,
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"],
	)) as CryptoKey;

	const hashedPassword = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv },
		key,
		new TextEncoder().encode(password),
	);

	const decodedPassword = new TextDecoder("utf-8").decode(
		await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, hashedPassword),
	);
	return c.text(decodedPassword);
});

export default app;
