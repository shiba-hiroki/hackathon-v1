import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import {
	KvFactory,
	SetUserInContextFactory,
	UserRepositoryFactory,
} from "../../factoryType";
import { UserType } from "../user/entity";
import { sessionCookieName } from "./const";

const authenticateUser = async (
	c: Context,
	kvFactory: KvFactory,
	userRepositoryFactory: UserRepositoryFactory,
	setUserInContextFactory: SetUserInContextFactory,
	userType?: UserType,
) => {
	const sessionID =
		getCookie(c, sessionCookieName) ||
		c.req.header("Authorization")?.replace(/Bearer\s+/i, "");

	if (sessionID == null) {
		return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
	}

	const userID = await kvFactory(c).getUserID(sessionID);
	if (userID == null) {
		return c.json({ message: "unauthorized" }, StatusCodes.UNAUTHORIZED);
	}

	const user = await userRepositoryFactory(c).findByID(Number(userID));
	if (user == null) {
		return c.json({ message: "user not found" }, StatusCodes.NOT_FOUND);
	}

	if (userType && user.type !== userType) {
		return c.json({ message: `not ${userType}` }, StatusCodes.FORBIDDEN);
	}

	setUserInContextFactory(c)(user);
	return;
};

const factory = createFactory();

export const useUserAuthentication = (
	kvFactory: KvFactory,
	userRepositoryFactory: UserRepositoryFactory,
	setUserInContextFactory: SetUserInContextFactory,
) =>
	factory.createMiddleware(async (c, next) => {
		const result = await authenticateUser(
			c,
			kvFactory,
			userRepositoryFactory,
			setUserInContextFactory,
		);
		if (result != null) return result;
		await next();
	});

export const useEmployerAuthentication = (
	kvFactory: KvFactory,
	userRepositoryFactory: UserRepositoryFactory,
	setUserInContextFactory: SetUserInContextFactory,
) =>
	factory.createMiddleware(async (c, next) => {
		const result = await authenticateUser(
			c,
			kvFactory,
			userRepositoryFactory,
			setUserInContextFactory,
			"employer",
		);
		if (result != null) return result;
		await next();
	});

export const useEmployeeAuthentication = (
	kvFactory: KvFactory,
	userRepositoryFactory: UserRepositoryFactory,
	setUserInContextFactory: SetUserInContextFactory,
) =>
	factory.createMiddleware(async (c, next) => {
		const result = await authenticateUser(
			c,
			kvFactory,
			userRepositoryFactory,
			setUserInContextFactory,
			"employee",
		);
		if (result != null) return result;
		await next();
	});
