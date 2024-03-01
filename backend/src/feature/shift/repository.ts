import { and, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema";
import { ConfirmedShiftRepository, ShiftRequestRepository } from "./interface";

export const useShiftRequestRepository = (
	db: D1Database,
): ShiftRequestRepository => {
	const connection = drizzle(db, { schema });
	return {
		async deleteInMonth(userID, year, month) {
			await connection
				.delete(schema.ShiftRequestModel)
				.where(
					and(
						eq(schema.ShiftRequestModel.userID, userID),
						like(schema.ShiftRequestModel.startTime, `${year}/${month}%`),
					),
				);
		},
		async insertMany(shiftRequest) {
			await connection.insert(schema.ShiftRequestModel).values(
				shiftRequest.shiftTime.map((s) => {
					return {
						userID: shiftRequest.userID,
						startTime: s[0].toLocaleString(),
						endTime: s[1].toLocaleString(),
					};
				}),
			);
		},
		async findInMonth(userID, year, month) {
			const shifts = await connection
				.select()
				.from(schema.ShiftRequestModel)
				.where(
					and(
						eq(schema.ShiftRequestModel.userID, userID),
						like(schema.ShiftRequestModel.startTime, `${year}/${month}%`),
					),
				);
			return {
				userID: userID,
				shiftTime: shifts.map((s) => [
					new Date(s.startTime),
					new Date(s.endTime),
				]),
			};
		},
	};
};

export const useConfirmedShiftRepository = (
	db: D1Database,
): ConfirmedShiftRepository => {
	const connection = drizzle(db, { schema });
	return {
		async deleteInMonth(year, month) {
			await connection
				.delete(schema.ConfirmedShiftModel)
				.where(like(schema.ConfirmedShiftModel.startTime, `${year}/${month}%`));
		},
		async insertMany(confirmedShifts) {
			await connection.insert(schema.ConfirmedShiftModel).values(
				confirmedShifts.flatMap((confirmedShift) =>
					confirmedShift.shiftTime.map((s) => {
						return {
							userID: confirmedShift.userID,
							startTime: s[0].toLocaleString(),
							endTime: s[1].toLocaleString(),
						};
					}),
				),
			);
		},
		async findInMonth(year, month) {
			const shifts = await connection
				.select()
				.from(schema.ConfirmedShiftModel)
				.where(like(schema.ConfirmedShiftModel.startTime, `${year}/${month}%`));
			return shifts
				.map((s) => s.userID)
				.filter((id): id is number => id !== null)
				.map((userID) => {
					return {
						userID,
						shiftTime: shifts
							.filter((s) => s.userID === userID)
							.map((s) => {
								return [new Date(s.startTime), new Date(s.endTime)];
							}),
					};
				});
		},
	};
};
