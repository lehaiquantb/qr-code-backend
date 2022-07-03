import { factoryExcute } from '~database/factories';
import { FactoryDefine } from '.';
import { PermissionEntity } from './../../src/modules/role/entity/permission.entity';
import { RolePermissionEntity } from './../../src/modules/role/entity/role-permission.entity';
import { RoleEntity } from './../../src/modules/role/entity/role.entity';

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
