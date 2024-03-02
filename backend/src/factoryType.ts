import { Context } from "hono";
import { AttendanceRepository } from "./feature/attendance/interface";
import {
	ConfirmedShiftRepository,
	ShiftRequestRepository,
} from "./feature/shift/interface";
import { User } from "./feature/user/entity";
import { UserRepository } from "./feature/user/interface";
import { KV } from "./kv/interface";

export type KvFactory = (c: Context) => KV;
export type SetUserInContextFactory = (c: Context) => (user: User) => void;
export type GetUserInContextFactory = (c: Context) => () => User;
export type EncryptionKeyFactory = (c: Context) => string;
export type InitializationVectorFactory = (c: Context) => string;
export type UserRepositoryFactory = (c: Context) => UserRepository;
export type ShiftRequestRepositoryFactory = (
	c: Context,
) => ShiftRequestRepository;
export type ConfirmedShiftRepositoryFactory = (
	c: Context,
) => ConfirmedShiftRepository;
export type AttendanceRepositoryFactory = (c: Context) => AttendanceRepository;
