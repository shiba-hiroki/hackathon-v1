import { Context } from "hono";
import {
	useGetAttendanceInMonthHandler,
	useGetMyAttendanceInMonthHandler,
} from "./feature/attendance/handler";
import { useAttendanceRepository } from "./feature/attendance/repository";
import {
	useEmployeeLoginHandler,
	useEmployerLoginHandler,
} from "./feature/auth/handler";
import {
	useEmployeeAuthentication,
	useEmployerAuthentication,
	useUserAuthentication,
} from "./feature/auth/middleware";
import {
	useGetConfirmedShiftInMonthHandler,
	useUpdateShiftRequestInMonthHandler,
} from "./feature/shift/handler";
import {
	useConfirmedShiftRepository,
	useShiftRequestRepository,
} from "./feature/shift/repository";
import { User } from "./feature/user/entity";
import {
	useUserDeleteHandler,
	useUserListHandler,
	useUserRegistrationHandler,
} from "./feature/user/handler";
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

const encryptionKeyFactory = (c: ContextWithEnv) => c.env.ENCRYPTION_KEY;

const initializationVectorFactory = (c: ContextWithEnv) =>
	c.env.INITIALIZATION_VECTOR;

const setUserInContextFactory = (c: ContextWithEnv) => (user: User) =>
	c.set("user", user);

const getUserInContextFactory = (c: ContextWithEnv) => () => c.var.user;

const userRepositoryFactory = (c: ContextWithEnv) =>
	useUserRepository(c.env.DB);

const shiftRequestRepositoryFactory = (c: ContextWithEnv) =>
	useShiftRequestRepository(c.env.DB);

const confirmedShiftRepositoryFactory = (c: ContextWithEnv) =>
	useConfirmedShiftRepository(c.env.DB);

const attendanceRecordRepositoryFactory = (c: ContextWithEnv) =>
	useAttendanceRepository(c.env.DB);

export const userAuthentication = useUserAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContextFactory,
);

export const employerAuthentication = useEmployerAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContextFactory,
);

export const employeeAuthentication = useEmployeeAuthentication(
	kvFactory,
	userRepositoryFactory,
	setUserInContextFactory,
);

export const employeeLoginHandler = useEmployeeLoginHandler(
	kvFactory,
	userRepositoryFactory,
	encryptionKeyFactory,
	initializationVectorFactory,
);

export const employerLoginHandler = useEmployerLoginHandler(
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

export const userDeleteHandler = useUserDeleteHandler(userRepositoryFactory);

export const userListHandler = useUserListHandler(userRepositoryFactory);

export const updateShiftRequestInMonthHandler =
	useUpdateShiftRequestInMonthHandler(
		shiftRequestRepositoryFactory,
		getUserInContextFactory,
	);

export const getConfirmedShiftInMonthHandler =
	useGetConfirmedShiftInMonthHandler(confirmedShiftRepositoryFactory);

export const getMyAttendanceInMonthHandler = useGetMyAttendanceInMonthHandler(
	attendanceRecordRepositoryFactory,
	getUserInContextFactory,
);

export const getAttendanceInMonthHandler = useGetAttendanceInMonthHandler(
	attendanceRecordRepositoryFactory,
);
