export class BaseHttpError extends Error {
  statusCode: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.statusCode = status;

    Error.captureStackTrace(this);
  }
}

export const createAppError = function (name: string, status: number) {
  return class HttpError extends BaseHttpError {
    constructor(message: string) {
      super(message, name, status);
    }
  };
};
