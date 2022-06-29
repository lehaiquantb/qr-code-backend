import { UserTokenType } from './../../modules/auth/auth.constant';
import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
    CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractToken } from '../helpers/common.function';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../config/config-key';
import { Reflector } from '@nestjs/core';
import { METADATA_KEY } from '../constants';
import { AuthOptions } from '~decorators/common.decorator';
import { IAuthUser } from '~base/interface.base';
@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authOptions = this.reflector.get<AuthOptions>(
            METADATA_KEY.AUTH_OPTIONS,
            context.getHandler(),
        );
        if (authOptions?.isPublic) return true;

        const token = extractToken(request.headers.authorization ?? '');
        if (!token) {
            throw new UnauthorizedException();
        }

        const authUser = (await this.validateToken(
            token,
            request.authorizationType === UserTokenType.REFRESH_TOKEN,
        )) as IAuthUser;

        request.authUser = authUser;

        return true;
    }

    async validateToken(token: string, isRefreshToken = false) {
        try {
            if (isRefreshToken) {
                return await this.jwtService.verify(token, {
                    secret: this.configService.get(
                        ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
                    ),
                    ignoreExpiration: false,
                });
            } else {
                return await this.jwtService.verify(token, {
                    secret: this.configService.get(
                        ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
                    ),
                    ignoreExpiration: false,
                });
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
