export interface KV {
	createSessionID(userID: number, ttl: number): Promise<string>;
	getUserID(sessionID: string): Promise<string | null>;
}
