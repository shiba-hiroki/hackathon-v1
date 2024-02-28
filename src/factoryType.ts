import { Context } from "hono";
import { User } from "./feature/user/entity";
import { UserRepository } from "./feature/user/interface";
import { KV } from "./kv/interface";

export type kvFactory = (c: Context) => KV;
export type userRepositoryFactory = (c: Context) => UserRepository;
export type setUserInContextFactory = (c: Context) => (user: User) => void;
export type encryptionKeyFactory = (c: Context) => string;
export type initializationVectorFactory = (c: Context) => string;
