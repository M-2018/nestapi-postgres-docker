import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estás ejecutando el LoggerMiddleware ${req.method} en la ruta ${req.url}`,
    );
    next();
  }
}

export function LoggerMiddlewareGlobal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentTime = new Date().toLocaleTimeString();
  console.log(
    `[${currentTime}] Estás ejecutando el LoggerMiddlewareGlobal ${req.method} en la ruta ${req.url}`,
  );
  next();
}
