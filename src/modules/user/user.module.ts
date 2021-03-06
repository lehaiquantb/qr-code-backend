import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        AuthModule,
        RoleModule,
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [UserController],
    providers: [UserService, DatabaseService],
    exports: [UserService],
})
export class UserModule {}
