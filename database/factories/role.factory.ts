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

const roleFactory: FactoryDefine<RoleEntity> = async () => {
    const e = new RoleEntity();
    e.name = 'admin';
    e.description = 'admin cant access to all';
    return e;
};

export default roleFactory;
