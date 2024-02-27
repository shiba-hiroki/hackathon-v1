import { OpenAPIHono } from "@hono/zod-openapi";
import { EmployeeRegistrationRouter } from "./feature/user/router";
import { employeeRegistrationHandler } from "./injection";

const app = new OpenAPIHono();

app.openapi(EmployeeRegistrationRouter, employeeRegistrationHandler);

export default app;
