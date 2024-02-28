import { Context } from "hono";
import { useLoginHandler } from "./feature/auth/handler";
import {
	useEmployeeAuthentication,
	useEmployerAuthentication,
	useUserAuthentication,
} from "./feature/auth/middleware";
import { User } from "./feature/user/entity";
import { useUserRegistrationHandler } from "./feature/user/handler";
import { useUserRepository } from "./feature/user/repository";
import { useKV } from "./kv/kv";

export type Env = {
	Variables: {
		user: User;
	};
	Bindings: {
		DB: D1Database;
		KV: KVNamespace;
		ENCRYPTION_KEY: string;
		INITIALIZATION_VECTOR: string;
	};
};

export type ContextWithEnv = Context<Env>;

const kvFactory = (c: ContextWithEnv) => useKV(c.env.KV);

const userRepositoryFactory = (c: ContextWithEnv) =>
	useUserRepository(c.env.DB);

const encryptionKeyFactory = (c: ContextWithEnv) => c.env.ENCRYPTION_KEY;

const initializationVectorFactory = (c: ContextWithEnv) =>
	c.env.INITIALIZATION_VECTOR;

const setUserInContext = (c: ContextWithEnv) => (user: User) =>
	c.set("user", user);

export const userAuthentication = useUserAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContext,
);

export const employerAuthentication = useEmployerAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContext,
);

export const employeeAuthentication = useEmployeeAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContext,
);

export const loginHandler = useLoginHandler(
	kvFactory,
	userRepositoryFactory,
	encryptionKeyFactory,
	initializationVectorFactory,
);

export const userRegistrationHandler = useUserRegistrationHandler(
	userRepositoryFactory,
	encryptionKeyFactory,
	initializationVectorFactory,
);
