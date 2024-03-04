import { z } from "zod";
export interface Env {
	DB: D1Database;
	SECRET_KEY: string;
}

const attendance = z.object({
	userID: z.number(),
	time: z.string().datetime({ offset: true }),
	state: z.enum(["checkIn", "checkOut", "brakeStart", "brakeEnd"]),
});

export default {
	async fetch(request: Request, env: Env) {
		try {
			const { pathname } = new URL(request.url);

			if (
				pathname === "/api/attendance" &&
				request.method.toUpperCase() === "POST"
			) {
				const apiKey = request.headers.get("x-api-key");
				if (apiKey == null || apiKey === env.SECRET_KEY) {
					return new Response("UNAUTHORIZED", { status: 401 });
				}

				const requestBody = await request.json();
				const ParsedBody = attendance.safeParse(requestBody);
				if (ParsedBody.success === false) {
					return new Response(ParsedBody.error.message, { status: 400 });
				}

				const { success } = await env.DB.prepare(
					"INSERT INTO `attendance` (`user_id`, `time`, `state`) VALUES (?1, ?2, ?3)",
				)
					.bind(
						ParsedBody.data.userID,
						ParsedBody.data.time,
						ParsedBody.data.state,
					)
					.run();
				if (success) {
					return new Response("CREATED", { status: 201 });
				}
				return new Response("INTERNAL SERVER ERROR", { status: 500 });
			}
			return new Response("NOT FOUND", { status: 404 });
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			}
		}
	},
};
