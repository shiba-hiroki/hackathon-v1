import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import {
	kvFactory,
	setUserInContextFactory,
	userRepositoryFactory,
} from "../../factoryType";
import { UserType } from "../user/entity";
import { sessionCookieName } from "./const";

const authenticateUser = async (
	c: Context,
	kvFactory: kvFactory,
	userRepositoryFactory: userRepositoryFactory,
	setUserInContextFactory: setUserInContextFactory,
	userType?: UserType,
) => {
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

	if (userType && user.type !== userType) {
		return c.json({ message: `user not ${userType}` }, StatusCodes.FORBIDDEN);
	}

	setUserInContextFactory(c)(user);
	return;
};

const factory = createFactory();

export const useUserAuthentication = (
	kvFactory: kvFactory,
	userRepositoryFactory: userRepositoryFactory,
	setUserInContextFactory: setUserInContextFactory,
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
	kvFactory: kvFactory,
	userRepositoryFactory: userRepositoryFactory,
	setUserInContextFactory: setUserInContextFactory,
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
	kvFactory: kvFactory,
	userRepositoryFactory: userRepositoryFactory,
	setUserInContextFactory: setUserInContextFactory,
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
