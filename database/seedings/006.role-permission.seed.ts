import { PermissionActionEntity } from '../../src/modules/role/entity/permission-action.entity';
import { PermissionEntity } from '../../src/modules/role/entity/permission.entity';
import { RolePermissionEntity } from '../../src/modules/role/entity/role-permission.entity';
import { RoleEntity } from '../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from '../../src/modules/role/entity/permission-resource.entity';
import { ROLE_TYPE, PERMISSION_ACTION, PERMISSION_RESOURCE } from '~common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();
export class RolePermission_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionAction = await factoryExcute(PermissionActionEntity, {
            action: PERMISSION_ACTION.MANAGE_ALL,
        });
        // const permissionResourceId = (
        //     await factoryExcute(PermissionResourceEntity, {
        //         resource: PERMISSION_RESOURCE.USER,
        //     })
        // ).id;

        // const permissionResourceIdProduct = (
        //     await factoryExcute(PermissionResourceEntity, {
        //         resource: PERMISSION_RESOURCE.PRODUCT,
        //     })
        // ).id;

        // const permissionResourceIdProduct = (
        //     await factoryExcute(PermissionResourceEntity, {
        //         resource: PERMISSION_RESOURCE.PRODUCT,
        //     })
        // ).id;

        const permissionResources: PermissionResourceEntity[] =
            await Promise.all([
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.PRODUCT,
                }),
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.USER,
                }),
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.ACTION,
                }),
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.FILE,
                }),
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.CATEGORY,
                }),
                factoryExcute(PermissionResourceEntity, {
                    resource: PERMISSION_RESOURCE.PROVIDER,
                }),
            ]);

        // const promises = [
        //     factoryExcute(RolePermissionEntity, {
        //         role: await factoryExcute(RoleEntity, {
        //             name: ROLE_TYPE.ADMIN,
        //         }),
        //         permission: await factoryExcute(PermissionEntity, {
        //             permissionActionId,
        //             permissionResourceId,
        //         }),
        //     }),

        //     factoryExcute(RolePermissionEntity, {
        //         role: await factoryExcute(RoleEntity, {
        //             name: ROLE_TYPE.ADMIN,
        //         }),
        //         permission: await factoryExcute(PermissionEntity, {
        //             permissionActionId,
        //             permissionResourceId: permissionResourceIdProduct,
        //         }),
        //     }),
        // ];

        const permissionsAdmin = await Promise.all(
            permissionResources.map(async (permissionResource) => {
                return factoryExcute(PermissionEntity, {
                    permissionAction,
                    permissionResource,
                });
            }),
        );

        const permissionsProvider = await Promise.all([
            factoryExcute(PermissionEntity, {
                permissionAction: () =>
                    factoryExcute(PermissionActionEntity, {
                        action: PERMISSION_ACTION.MANAGE_ALL,
                    }),
                permissionResource: () =>
                    factoryExcute(PermissionResourceEntity, {
                        resource: PERMISSION_RESOURCE.PRODUCT,
                    }),
            }),
        ]);

        await Promise.all([
            ...permissionsAdmin.map(async (permission) => {
                return factoryExcute(RolePermissionEntity, {
                    role: await factoryExcute(RoleEntity, {
                        name: ROLE_TYPE.ADMIN,
                    }),
                    permission,
                });
            }),
            ...permissionsProvider.map(async (permission) => {
                return factoryExcute(RolePermissionEntity, {
                    role: await factoryExcute(RoleEntity, {
                        name: ROLE_TYPE.PROVIDER,
                    }),
                    permission,
                });
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.ROLE_PERMISSION).clear();
    }
}
