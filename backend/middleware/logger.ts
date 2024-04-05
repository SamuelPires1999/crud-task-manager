import { NextFunction, Request, Response } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `[API] ${req.method} at: ${req.originalUrl} - ${new Date().toDateString()}`
  );
  next();
};
