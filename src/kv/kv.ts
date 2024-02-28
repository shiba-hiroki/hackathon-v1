import { KV } from "./interface";

export const useKV = (kv: KVNamespace): KV => {
	return {
		async createSessionID(userID, ttl) {
			const sessionID = crypto.randomUUID();
			await kv.put(sessionID, userID.toString(), {
				expirationTtl: ttl,
			});
			return sessionID;
		},
	};
};
