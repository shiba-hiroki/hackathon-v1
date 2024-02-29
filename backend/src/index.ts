import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { StatusCodes } from "http-status-codes";
import {
	employeeAuthentication,
	employeeLoginHandler,
	employerAuthentication,
	employerLoginHandler,
	userAuthentication,
	userRegistrationHandler,
} from "./di";
import {
	EmployeeLoginRouter,
	EmployerLoginRouter,
} from "./feature/auth/router";
import { UserRegistrationRouter } from "./feature/user/router";

const app = new OpenAPIHono();

app.use(cors());
app.use(secureHeaders());

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "hackathon",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.openapi(EmployeeLoginRouter, employeeLoginHandler);
app.openapi(EmployerLoginRouter, employerLoginHandler);

app.use("/api/user/*", userAuthentication);
app.use("/api/employer/*", employerAuthentication);
app.use("/api/employee/*", employeeAuthentication);

app.openapi(UserRegistrationRouter, userRegistrationHandler);

app.onError((err, c) => {
	console.error(err);
	return c.json(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
});

export default app;
