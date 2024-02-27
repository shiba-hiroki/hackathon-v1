import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { KV } from "../../kv/interface";
import { Base64ToUint8Array } from "../../util/arrayBuffer";
import { getCryptKey } from "../../util/crypt";
import { UserRepository } from "../user/interface";
import { LoginRouter } from "./router";

export const useLoginHandler =
	(
		kv: KV,
		userRepository: UserRepository,
		encryptionKey: string,
		initializationVector: string,
	): RouteHandler<typeof LoginRouter> =>
	async (c) => {
		const { name, password } = c.req.valid("json");

		const userWithHashedPassword = await userRepository.findByName(name);

		if (userWithHashedPassword == null) {
			return c.json({ message: "user not found" }, StatusCodes.NOT_FOUND);
		}

		const decodedPassword = await decodePassword(
			initializationVector,
			await getCryptKey(encryptionKey),
			userWithHashedPassword.hashedPassword,
		);

		if (decodedPassword !== password) {
			return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
		}

		const sessionID = await kv.createSessionID(userWithHashedPassword.id);

		return c.json({ sessionID }, StatusCodes.CREATED);
	};

const decodePassword = async (
	initializationVector: string,
	cryptoKey: CryptoKey,
	hashedPassword: string,
) =>
	new TextDecoder("utf-8").decode(
		await crypto.subtle.decrypt(
			{ name: "AES-GCM", iv: Base64ToUint8Array(initializationVector) },
			cryptoKey,
			Base64ToUint8Array(hashedPassword),
		),
	);
