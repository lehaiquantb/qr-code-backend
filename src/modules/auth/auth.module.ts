import {
    Global,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { AuthController } from './auth.controller';
import { RefreshTokenMiddleware } from './auth.middleware';
import ConfigKey from '../../../src/common/config/config-key';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/common/services/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '~user/user.repository';

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
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [AuthService, JwtGuard, DatabaseService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule, JwtGuard],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RefreshTokenMiddleware).forRoutes({
            path: '/auth/refresh-token',
            method: RequestMethod.POST,
        });
    }
}
