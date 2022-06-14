import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserTokenType } from './auth.constant';

interface IRefreshTokenRequest extends Request {
    authorizationType: string;
}
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
    use(req: IRefreshTokenRequest, res: Response, next: NextFunction) {
        req.authorizationType = UserTokenType.REFRESH_TOKEN;
        return next();
    }
}
