import { RouteHandler } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import {
	ConfirmedShiftRepositoryFactory,
	GetUserInContextFactory,
	ShiftRequestRepositoryFactory,
} from "../../factoryType";
import {
	GetConfirmedInMonthRouter,
	UpdateShiftRequestInMonthRouter,
} from "./router";
import { GetConfirmedInMonthResponseSchema } from "./schema";

export const useUpdateShiftRequestInMonthHandler =
	(
		shiftRequestRepositoryFactory: ShiftRequestRepositoryFactory,
		getUserInContextFactory: GetUserInContextFactory,
	): RouteHandler<typeof UpdateShiftRequestInMonthRouter> =>
	async (c) => {
		const shiftTime = c.req.valid("json");

		await shiftRequestRepositoryFactory(c).deleteInMonth(
			getUserInContextFactory(c)().id,
			shiftTime[0][0].toLocaleDateString().slice(0, 4),
			shiftTime[0][0].toLocaleDateString().slice(5, 6),
		);

		await shiftRequestRepositoryFactory(c).insert({
			userID: getUserInContextFactory(c)().id,
			shiftTime,
		});

		return c.body(null, StatusCodes.OK);
	};

export const useGetConfirmedShiftInMonthHandler =
	(
		confirmedShiftRepositoryFactory: ConfirmedShiftRepositoryFactory,
	): RouteHandler<typeof GetConfirmedInMonthRouter> =>
	async (c) => {
		const year = c.req.query("year");
		const month = c.req.query("month");
		if (year == null || month == null) {
			return c.json(
				{ message: "require year and month" },
				StatusCodes.BAD_REQUEST,
			);
		}

		const shifts = await confirmedShiftRepositoryFactory(c).findInMonth(
			year,
			month,
		);

		const response: GetConfirmedInMonthResponseSchema = shifts.map((s) => {
			return {
				userID: s.userID,
				shiftTime: s.shiftTime,
			};
		});

		return c.json(response, StatusCodes.OK);
	};
