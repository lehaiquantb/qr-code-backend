import { PERMISSION_ACTION } from '~common';
import { PermissionActionEntity } from '../../src/modules/role/entity/permission-action.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { UserTokenEntity } from '../../src/modules/auth/entity/user-token.entity';
import { UserStatus } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
import { createEntity, factoryExcute } from '~database/factories';
dotenv.config();
export class SeedingPermissionAction1720963593422
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.CREATE,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.DELETE,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.LOGIN,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.MANAGE_ALL,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.READ,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.READ_ALL,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.UPDATE,
            }),
            factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.UPDATE_STATUS,
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
