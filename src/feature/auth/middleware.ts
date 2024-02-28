import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { KV } from "../../kv/interface";
import { UserRepository } from "../user/interface";
import { sessionCookieName } from "./const";

export const useEmployerAuthentication = (
	kvFactory: (c: Context) => KV,
	userRepositoryFactory: (c: Context) => UserRepository,
) =>
	createFactory().createMiddleware(async (c, next) => {
		const sessionCookie = getCookie(c, sessionCookieName);

		if (sessionCookie == null) {
			return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
		}

		const userID = await kvFactory(c).getUserID(sessionCookie);
		if (userID == null) {
			return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
		}

		const user = await userRepositoryFactory(c).findByID(Number(userID));
		if (user == null) {
			return c.json({ message: "not found user" }, StatusCodes.NOT_FOUND);
		}

		if (user.type !== "employer") {
			return c.json({ message: "user not employer" }, StatusCodes.FORBIDDEN);
		}

		await next();
	});
