import { KV } from "./interface";

export const useKV = (kv: KVNamespace): KV => {
	return {
		async createSessionID(userID) {
			const sessionID = crypto.randomUUID();
			await kv.put(sessionID, userID.toString(), {
				expirationTtl: 60,
			});
			return sessionID;
		},
	};
};
