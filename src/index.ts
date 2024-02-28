import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { LoginHandler, userRegistrationHandler } from "./di";
import { LoginRouter } from "./feature/auth/router";
import { UserRegistrationRouter } from "./feature/user/router";

const app = new OpenAPIHono();

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "hackathon",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.openapi(LoginRouter, LoginHandler);

app.openapi(UserRegistrationRouter, userRegistrationHandler);

export default app;
