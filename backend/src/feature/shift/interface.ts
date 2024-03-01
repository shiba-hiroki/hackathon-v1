import { ConfirmedShift, ShiftRequest } from "./entity";

export interface ShiftRequestRepository {
	deleteInMonth(userID: number, year: number, month: number): Promise<void>;
	insertMany(shiftRequest: ShiftRequest): Promise<void>;
	findInMonth(
		userID: number,
		year: number,
		month: number,
	): Promise<ShiftRequest>;
}

export interface ConfirmedShiftRepository {
	deleteInMonth(year: number, month: number): Promise<void>;
	insertMany(confirmedShifts: ConfirmedShift[]): Promise<void>;
	findInMonth(year: number, month: number): Promise<ConfirmedShift[]>;
}
