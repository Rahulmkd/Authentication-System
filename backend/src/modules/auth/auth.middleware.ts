import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { verifyAccessToken } from "../../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired access token"));
  }
};
