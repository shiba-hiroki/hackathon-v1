import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { secureHeaders } from "hono/secure-headers";
import { StatusCodes } from "http-status-codes";
import { loginHandler, userRegistrationHandler } from "./di";
import { LoginRouter } from "./feature/auth/router";
import { UserRegistrationRouter } from "./feature/user/router";

const app = new OpenAPIHono();

app.use(secureHeaders());

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "hackathon",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.openapi(LoginRouter, loginHandler);

app.openapi(UserRegistrationRouter, userRegistrationHandler);

app.onError((err, c) => {
	console.error(err);
	return c.json(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
});

export default app;
