import { createAppError } from "../app.error.js";

export const BadRequestError = createAppError("Bad Request", 400);
export const UnauthorizedError = createAppError("Unauthorized", 401);
export const ForbiddenError = createAppError("Forbidden", 403);
export const NotFoundError = createAppError("Not Found", 404);
export const MethodNotAllowedError = createAppError("Method Not Allowed", 405);
export const RequestTimeoutError = createAppError("Request Timeout", 408);
export const ConflictError = createAppError("Conflict", 409);
