import { Context } from "hono";
import { useLoginHandler } from "./feature/auth/handler";
import { useUserRegistrationHandler } from "./feature/user/handler";
import { useUserRepository } from "./feature/user/repository";
import { useKV } from "./kv/kv";

type Bindings = {
	DB: D1Database;
	KV: KVNamespace;
	ENCRYPTION_KEY: string;
	INITIALIZATION_VECTOR: string;
};

type ContextWithBindings = Context<{ Bindings: Bindings }>;

const kvFactory = (c: ContextWithBindings) => useKV(c.env.KV);

const userRepositoryFactory = (c: ContextWithBindings) =>
	useUserRepository(c.env.DB);

const encryptionKeyFactory = (c: ContextWithBindings) => c.env.ENCRYPTION_KEY;

const initializationVectorFactory = (c: ContextWithBindings) =>
	c.env.INITIALIZATION_VECTOR;

export const LoginHandler = useLoginHandler(
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
