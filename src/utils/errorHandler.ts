import { StatusCodes } from "@/constants/statusCode";

class ErrorHandler extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
