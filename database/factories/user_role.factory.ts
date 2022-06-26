import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import { factoryExcute } from '~database/factories';
import { UserRoleEntity } from './../../src/modules/role/entity/user-role.entity';
import { faker } from '@faker-js/faker';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';

const userRoleFactory: FactoryDefine<UserRoleEntity> = async () => {
    const e = new UserRoleEntity();
    e.user = await factoryExcute(UserEntity);
    e.role = await factoryExcute(RoleEntity);
    return e;
};

export default userRoleFactory;
