import { UserEntity } from './../../src/modules/user/entity/user.entity';
import { UserRoleEntity } from 'src/modules/role/entity/user-role.entity';
import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from './../../src/modules/role/role.interface';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class UserRole_1720963593422
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, {id: 1}),
                role: await factoryExcute(RoleEntity, {name: 'admin'}),
            }),
            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, {id: 1}),
                role: await factoryExcute(RoleEntity, {name: 'user'}),
            }),

            factoryExcute(UserRoleEntity, {
                user: await factoryExcute(UserEntity, {id: 2}),
                role: await factoryExcute(RoleEntity, {name: 'user'}),
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
