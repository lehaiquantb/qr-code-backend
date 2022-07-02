import { PERMISSION_ACTION } from '~common';
import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { faker } from '@faker-js/faker';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';


const permissionActionFactory: FactoryDefine<PermissionActionEntity> = async (params) => {
    const entity = new PermissionActionEntity();
    entity.action = PERMISSION_ACTION.CREATE
    return entity;
};

export default permissionActionFactory;
