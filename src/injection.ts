import { Context } from "hono";
import { useEmployeeRegistrationHandler } from "./feature/user/handler";
import { useUserRepository } from "./feature/user/repository";

type Bindings = {
	DB: D1Database;
	KV: KVNamespace;
	ENCRYPTION_KEY: string;
	INITIALIZATION_VECTOR: string;
};

type ContextWithBindings = Context<{ Bindings: Bindings }>;

const userRepositoryFactory = (c: ContextWithBindings) =>
	useUserRepository(c.env.DB);

const encryptionKeyFactory = (c: ContextWithBindings) => c.env.ENCRYPTION_KEY;

const initializationVectorFactory = (c: ContextWithBindings) =>
	c.env.INITIALIZATION_VECTOR;

export const employeeRegistrationHandler = useEmployeeRegistrationHandler(
	userRepositoryFactory,
	encryptionKeyFactory,
	initializationVectorFactory,
);
