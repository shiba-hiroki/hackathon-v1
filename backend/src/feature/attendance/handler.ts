import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import {
	AttendanceRepositoryFactory,
	GetUserInContextFactory,
} from "../../factoryType";
import { GetMyAttendanceInMonthRouter } from "./router";

export const useGetMyAttendanceInMonthHandler =
	(
		attendanceRepositoryFactory: AttendanceRepositoryFactory,
		getUserInContextFactory: GetUserInContextFactory,
	): RouteHandler<typeof GetMyAttendanceInMonthRouter> =>
	async (c) => {
		const year = c.req.query("year");
		const month = c.req.query("month");
		if (year == null || month == null) {
			return c.json(
				{ message: "require year and month" },
				StatusCodes.BAD_REQUEST,
			);
		}

		const attendanceList = await attendanceRepositoryFactory(c).listInMonth(
			getUserInContextFactory(c)().id,
			year,
			month,
		);

		return c.json(
			{
				userID: attendanceList.userID,
				attendances: attendanceList.attendances,
			},
			StatusCodes.OK,
		);
	};
