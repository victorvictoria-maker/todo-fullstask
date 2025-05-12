import { ErrorWithStatusCode } from "../interfaces/interface";

export function createError(
  statusCode: number,
  message: string
): ErrorWithStatusCode {
  const error: ErrorWithStatusCode = new Error(message) as ErrorWithStatusCode;
  error.statusCode = statusCode;
  return error;
}
