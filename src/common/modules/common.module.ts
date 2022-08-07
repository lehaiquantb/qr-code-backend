import { Global, Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { HttpExceptionFilter, JwtGuard } from '~common';
import { TransformInterceptor } from '~common';
import ConfigKey from '~config/config-key';
import { CommonService } from './services/common.service';

const commonProviders = [CommonService];

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get(
                    ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
                ),
                signOptions: {
                    expiresIn: configService.get(ConfigKey.TOKEN_EXPIRED_IN),
                },
            }),
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        ...commonProviders,
        JwtGuard,
    ],

    exports: [...commonProviders, JwtGuard, JwtModule],
})
export class CommonModule {}
