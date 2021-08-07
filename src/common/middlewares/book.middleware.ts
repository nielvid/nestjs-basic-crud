import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BookMiddleWare implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('Request is padded with middlware');
    next();
  }
}
