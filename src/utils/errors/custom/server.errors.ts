import { createAppError } from "../app.error.js";

export const InternalServerError = createAppError("Internal Server Error", 500);
export const BadGatewayError = createAppError("Bad Gateway", 502);
export const ServiceUnavailableError = createAppError(
  "Service Unavailable",
  503
);
export const GatewayTimeoutError = createAppError("Gateway Timeout", 504);
