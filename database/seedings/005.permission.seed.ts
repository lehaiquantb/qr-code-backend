import { PermissionActionEntity } from '../../src/modules/role/entity/permission-action.entity';
import { PermissionEntity } from '../../src/modules/role/entity/permission.entity';
import { RoleEntity } from '../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from '../../src/modules/role/entity/permission-resource.entity';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from '~common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();
export class Permission_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        let permissionActionsPromise = [
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

        const permissionActions = await Promise.all(permissionActionsPromise);

        const permissionResourcePromise = [
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.USER,
            }),
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.PRODUCT,
            }),
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.CATEGORY,
            }),
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.FILE,
            }),
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.ACTION,
            }),
        ];

        const permissionResources = await Promise.all(
            permissionResourcePromise,
        );

        let promises = [];
        for (const permissionAction of permissionActions) {
            for (const permissionResource of permissionResources) {
                promises.push(
                    factoryExcute(PermissionEntity, {
                        permissionAction,
                        permissionResource,
                    }),
                );
            }
        }

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.PERMISSION).clear()
    }
}
