export interface KV {
	createSessionID(userID: number): Promise<string>;
}
