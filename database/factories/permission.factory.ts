import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from '~common';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { factoryExcute } from '~database/factories';
import { PermissionEntity } from './../../src/modules/role/entity/permission.entity';
import { faker } from '@faker-js/faker';
import { FactoryDefine } from '.';

const permissionFactory: FactoryDefine<PermissionEntity> = async (params) => {
    const e = new PermissionEntity();
    e.permissionAction =
        params?.permissionAction ??
        (await factoryExcute(PermissionActionEntity, {
            action: PERMISSION_ACTION.MANAGE_ALL,
        }));
    e.permissionResource =
        params?.permissionResource ??
        (await factoryExcute(PermissionResourceEntity, {
            resource: PERMISSION_RESOURCE.USER,
        }));
    return e;
};

export default permissionFactory;
