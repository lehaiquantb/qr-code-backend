import { RolePermissionEntity } from './../../src/modules/role/entity/role-permission.entity';
import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from '~common';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { factoryExcute } from '~database/factories';
import { PermissionEntity } from './../../src/modules/role/entity/permission.entity';
import { faker } from '@faker-js/faker';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';

const rolePermissionFactory: FactoryDefine<RolePermissionEntity> = async (
    params,
) => {
    const e = new RolePermissionEntity();
    e.permission =
        params?.permission ?? (await factoryExcute(PermissionEntity));
    e.role = params?.role ?? (await factoryExcute(RoleEntity));
    return e;
};

export default rolePermissionFactory;
