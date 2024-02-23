import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { Base64ToUint8Array } from "../util/arrayBuffer";
import { parseAsHashedPasswordModel } from "./model";
import { LoginRouter } from "./router";

export const useLoginHandler =
	(
		db: D1Database,
		kv: KVNamespace,
		encryptionKey: string,
		initializationVector: string,
	): RouteHandler<typeof LoginRouter> =>
	async (c) => {
		const { name, password } = c.req.valid("json");

		const PromiseKey = crypto.subtle.importKey(
			"raw",
			Base64ToUint8Array(encryptionKey),
			{
				name: "AES-GCM",
				length: 256,
			},
			true,
			["encrypt", "decrypt"],
		);

		const result = await db
			.prepare("SELECT id hashed_password FROM users WHERE name = ?")
			.bind(name)
			.first();

		if (result == null) {
			return c.json({ message: "user not found" }, StatusCodes.NOT_FOUND);
		}

		const parsedResult = parseAsHashedPasswordModel(result);
		if (parsedResult instanceof Error) {
			return c.json(
				{ message: "please reset password" },
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}

		const decodedPassword = new TextDecoder("utf-8").decode(
			await crypto.subtle.decrypt(
				{ name: "AES-GCM", iv: Base64ToUint8Array(initializationVector) },
				await PromiseKey,
				Base64ToUint8Array(parsedResult.hashed_password),
			),
		);

		if (decodedPassword !== password) {
			return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
		}

		const sessionID = new Date().toISOString() + crypto.randomUUID();
		await kv.put(sessionID, parsedResult.id);
		return c.json({ sessionID }, StatusCodes.CREATED);
	};
