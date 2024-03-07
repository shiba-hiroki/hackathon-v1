import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./v1";

const authMiddleware: Middleware = {
	async onRequest(req) {
		const sessionID = localStorage.getItem("sessionID");
		req.headers.set("Authorization", `Bearer ${sessionID}`);
		return req;
	},
};

export const client = createClient<paths>({
	baseUrl: import.meta.env.VITE_API_URL,
});
client.use(authMiddleware);
