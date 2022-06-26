import { UserEntity } from 'src/modules/user/entity/user.entity';
import { UserTokenEntity } from './../../src/modules/auth/entity/user-token.entity';
import { UserRole } from '../../src/modules/user/user.constant';
import { UserStatus } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
import { createEntity, factoryExcute } from '~database/factories';
dotenv.config();
export class SeedingUser1720963593420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userEntity = await factoryExcute(UserEntity, { id: 2 });
        await factoryExcute(UserTokenEntity, { user: userEntity });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
