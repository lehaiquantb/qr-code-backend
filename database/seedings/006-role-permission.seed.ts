import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { PermissionEntity } from './../../src/modules/role/entity/permission.entity';
import { RolePermissionEntity } from './../../src/modules/role/entity/role-permission.entity';
import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import {
    DEFAULT_ROLE,
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from './../../src/modules/role/role.interface';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class RolePermission_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionActionId = (
            await factoryExcute(PermissionActionEntity, {
                action: PERMISSION_ACTION.MANAGE_ALL,
            })
        ).id;
        const permissionResourceId = (
            await factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.USER,
            })
        ).id;

        const permissionResourceIdProduct = (
            await factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.PRODUCT,
            })
        ).id;

        const promises = [
            factoryExcute(RolePermissionEntity, {
                role: await factoryExcute(RoleEntity, {
                    name: DEFAULT_ROLE.ADMIN,
                }),
                permission: await factoryExcute(PermissionEntity, {
                    permissionActionId,
                    permissionResourceId,
                }),
            }),

            factoryExcute(RolePermissionEntity, {
                role: await factoryExcute(RoleEntity, {
                    name: DEFAULT_ROLE.ADMIN,
                }),
                permission: await factoryExcute(PermissionEntity, {
                    permissionActionId,
                    permissionResourceId: permissionResourceIdProduct,
                }),
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
