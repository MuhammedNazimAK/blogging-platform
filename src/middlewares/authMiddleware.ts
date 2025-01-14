import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import STATUS_CODES from "../shared/constants/statusCodes";

export interface RequestWithUser extends Request {
  user?: any
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
 const token = req.headers.authorization?.split(" ")[1];
 
 if (!token) {
  res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "No token provided" });
  return;
 }

 try {
  const decoded = jwt.verify(token, process.env.jwt_SECTRET!);

  (req as RequestWithUser).user = decoded;
  next();
 } catch (err) {
  res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
  return;
 }
};