import { UserEntity } from '../../src/modules/user/entity/user.entity';
import { UserRoleEntity } from 'src/modules/role/entity/user-role.entity';
import { RoleEntity } from '../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from '../../src/modules/role/entity/permission-resource.entity';
import { ROLE_TYPE, PERMISSION_ACTION, PERMISSION_RESOURCE } from '~common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();
export class UserRole_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 1 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.ADMIN,
                }),
            }),
            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 1 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.MEMBER,
                }),
            }),

            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 1 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.PROVIDER,
                }),
            }),

            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 2 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.MEMBER,
                }),
            }),

            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 3 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.MEMBER,
                }),
            }),
            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, { id: 3 }),
                role: await factoryExcute(RoleEntity, {
                    name: ROLE_TYPE.PROVIDER,
                }),
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.USER_ROLE).clear();
    }
}
