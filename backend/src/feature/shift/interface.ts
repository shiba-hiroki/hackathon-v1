import { ConfirmedShift, ShiftRequest } from "./entity";

export interface ShiftRequestRepository {
	deleteInMonth(userID: number, year: string, month: string): Promise<void>;
	insert(shiftRequest: ShiftRequest): Promise<void>;
	findInMonth(
		userID: number,
		year: string,
		month: string,
	): Promise<ShiftRequest>;
}

export interface ConfirmedShiftRepository {
	deleteInMonth(year: string, month: string): Promise<void>;
	insertMany(confirmedShifts: ConfirmedShift[]): Promise<void>;
	findInMonth(year: string, month: string): Promise<ConfirmedShift[]>;
}
