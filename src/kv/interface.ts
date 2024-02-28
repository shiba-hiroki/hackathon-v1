export interface KV {
	createSessionID(userID: number, ttl: number): Promise<string>;
}
