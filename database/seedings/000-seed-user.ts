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
export class SeedingUser1720963593407 implements MigrationInterface {
    tableName = TABLE_NAME.USER;

    public async up(queryRunner: QueryRunner): Promise<void> {
     
        factoryExcute(UserEntity);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
