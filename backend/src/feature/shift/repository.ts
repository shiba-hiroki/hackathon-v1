import { and, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema";
import { ToISOPrefixYearAndMonth } from "../../util/time/iso";
import { ConfirmedShiftRepository, ShiftRequestRepository } from "./interface";

export const useShiftRequestRepository = (
	db: D1Database,
): ShiftRequestRepository => {
	const connection = drizzle(db, { schema });
	return {
		async deleteInMonth(userID, year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			await connection
				.delete(schema.ShiftRequestModel)
				.where(
					and(
						eq(schema.ShiftRequestModel.userID, userID),
						like(schema.ShiftRequestModel.startTime, prefix),
					),
				);
		},
		async insert(shiftRequest) {
			await connection.insert(schema.ShiftRequestModel).values(
				shiftRequest.shiftTime.map((s) => {
					return {
						userID: shiftRequest.userID,
						startTime: s[0],
						endTime: s[1],
					};
				}),
			);
		},
		async findInMonth(userID, year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			const shifts = await connection
				.select()
				.from(schema.ShiftRequestModel)
				.where(
					and(
						eq(schema.ShiftRequestModel.userID, userID),
						like(schema.ShiftRequestModel.startTime, prefix),
					),
				);
			return {
				userID: userID,
				shiftTime: shifts.map((s) => [s.startTime, s.endTime]),
			};
		},
		async listInMonth(year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			const shifts = await connection
				.select()
				.from(schema.ShiftRequestModel)
				.where(like(schema.ShiftRequestModel.startTime, prefix));
			return shifts
				.map((s) => s.userID)
				.map((userID) => {
					return {
						userID,
						shiftTime: shifts
							.filter((s) => s.userID === userID)
							.map((s) => [s.startTime, s.endTime]),
					};
				});
		},
	};
};

export const useConfirmedShiftRepository = (
	db: D1Database,
): ConfirmedShiftRepository => {
	const connection = drizzle(db, { schema });
	return {
		async deleteInMonth(year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			await connection
				.delete(schema.ConfirmedShiftModel)
				.where(like(schema.ConfirmedShiftModel.startTime, prefix));
		},
		async insertMany(confirmedShifts) {
			await connection.insert(schema.ConfirmedShiftModel).values(
				confirmedShifts.flatMap((confirmedShift) =>
					confirmedShift.shiftTime.map((s) => {
						return {
							userID: confirmedShift.userID,
							startTime: s[0],
							endTime: s[1],
						};
					}),
				),
			);
		},
		async findInMonth(year, month) {
			const prefix = ToISOPrefixYearAndMonth(year, month);
			const shifts = await connection
				.select()
				.from(schema.ConfirmedShiftModel)
				.where(like(schema.ConfirmedShiftModel.startTime, prefix));
			return shifts
				.map((s) => s.userID)
				.map((userID) => {
					return {
						userID,
						shiftTime: shifts
							.filter((s) => s.userID === userID)
							.map((s) => [s.startTime, s.endTime]),
					};
				});
		},
	};
};
