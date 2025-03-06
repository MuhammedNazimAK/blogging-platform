import { Request, Response, NextFunction } from "express";
import STATUS_CODES from "../shared/constants/statusCodes";

interface ErrorType extends Error {
  status?: number;
}

const errorMiddleware = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};


export default errorMiddleware;
