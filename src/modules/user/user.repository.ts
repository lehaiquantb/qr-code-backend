import { PermissionEntity } from '~role/entity/permission.entity';
import { UserEntity } from '~user/entity/user.entity';
import { BaseRepository, columnsWithAlias } from '~common';
import { EntityRepository } from 'typeorm';
import { UserQueryBuilder } from './user.builder';
import { RoleEntity } from '~role/entity/role.entity';
import { RolePermissionEntity } from '~role/entity/role-permission.entity';
import { PermissionResourceEntity } from '~role/entity/permission-resource.entity';
import { PermissionActionEntity } from '~role/entity/permission-action.entity';
import { usersAttributes } from '~auth/auth.constant';
import _ from 'lodash';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    builder(alias: string): UserQueryBuilder {
        return new UserQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }

    async getUserWithAuthInfoByEmail(email: string): Promise<UserEntity> {
        const columns = columnsWithAlias([
            { alias: 'user', columns: usersAttributes },
            { alias: 'role', columns: ['id', 'name', 'description'] },
            { alias: 'permission', columns: ['id'] },
            {
                alias: 'permissionResource',
                columns: ['resource'],
            },
            { alias: 'permissionAction', columns: ['action'] },
        ]);

        const user = await this.builder('user')
            .filterByEmail(email)
            .leftJoin('user.userRoles', 'userRole', 'userRole.userId = user.id')
            .leftJoinAndMapMany(
                'user.roles',
                RoleEntity,
                'role',
                'role.id = userRole.roleId',
            )
            .leftJoinAndMapMany(
                'role.rolePermissions',
                RolePermissionEntity,
                'rolePermission',
                'rolePermission.roleId = role.id',
            )
            .leftJoinAndMapMany(
                'role.permissions',
                PermissionEntity,
                'permission',
                'permission.id = rolePermission.permissionId',
            )
            .leftJoinAndMapOne(
                'permission.resource',
                PermissionResourceEntity,
                'permissionResource',
                'permissionResource.id = permission.permissionResourceId',
            )
            .leftJoinAndMapOne(
                'permission.action',
                PermissionActionEntity,
                'permissionAction',
                'permissionAction.id = permission.permissionActionId',
            )
            .select(columns)
            .getOne();

        const allPermissions = [];

        user.roles = user.roles.map((role) => {
            const permissions = role?.permissions?.map((permission) => {
                return {
                    resource: permission?.resource?.resource,
                    action: permission?.action?.action,
                };
            });

            allPermissions.push(...permissions);

            return {
                id: role?.id,
                name: role?.name,
                description: role?.description,
                permissions,
            };
        });
        const temp = {};
        for (const p of allPermissions) {
            if (_.isEmpty(temp[p?.resource])) {
                temp[p?.resource] = [p?.action];
            } else {
                temp[p?.resource].push(p?.action);
            }
        }

        user.resourceWithActions = temp;

        return user;
    }
}
