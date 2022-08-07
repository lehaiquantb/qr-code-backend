import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { RefreshTokenMiddleware } from './auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '~user/user.repository';
import { UserModule } from '~user/user.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        forwardRef(() => UserModule),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RefreshTokenMiddleware).forRoutes({
            path: '/auth/refresh-token',
            method: RequestMethod.POST,
        });
    }
}
