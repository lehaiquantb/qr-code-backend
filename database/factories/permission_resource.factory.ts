import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import { PERMISSION_ACTION, PERMISSION_RESOURCE } from '~common';
import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { faker } from '@faker-js/faker';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';


const permissionResourceFactory: FactoryDefine<PermissionResourceEntity> = async (params) => {
    const entity = new PermissionResourceEntity();
    entity.resource = PERMISSION_RESOURCE.USER;
    return entity;
};

export default permissionResourceFactory;
