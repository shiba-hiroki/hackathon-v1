import { RouteHandler } from "@hono/zod-openapi";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { StatusCodes } from "http-status-codes";
import { KV } from "../../kv/interface";
import { decodePassword } from "../../util/hash";
import { UserRepository } from "../user/interface";
import { sessionCookieName, sessionIdTTL } from "./const";
import { LoginRouter } from "./router";

export const useLoginHandler =
	(
		kvFactory: (c: Context) => KV,
		userRepositoryFactory: (c: Context) => UserRepository,
		encryptionKeyFactory: (c: Context) => string,
		initializationVectorFactory: (c: Context) => string,
	): RouteHandler<typeof LoginRouter> =>
	async (c) => {
		const { name, password } = c.req.valid("json");

		const userWithHashedPassword =
			await userRepositoryFactory(c).findByName(name);

		if (userWithHashedPassword == null) {
			return c.json({ message: "user not found" }, StatusCodes.NOT_FOUND);
		}

		const decodedPassword = await decodePassword(
			initializationVectorFactory(c),
			encryptionKeyFactory(c),
			userWithHashedPassword.hashedPassword,
		);

		if (decodedPassword !== password) {
			return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
		}

		const sessionID = await kvFactory(c).createSessionID(
			userWithHashedPassword.id,
			sessionIdTTL,
		);

		setCookie(c, sessionCookieName, sessionID, {
			path: "/api",
			secure: true,
			httpOnly: true,
			maxAge: sessionIdTTL,
			sameSite: "Strict",
		});

		return c.body(null, StatusCodes.CREATED);
	};
