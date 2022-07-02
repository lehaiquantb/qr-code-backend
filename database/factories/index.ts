import { UserRoleEntity } from './../../src/modules/role/entity/user-role.entity';
import { RolePermissionEntity } from './../../src/modules/role/entity/role-permission.entity';
import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import { PermissionEntity } from './../../src/modules/role/entity/permission.entity';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import { PermissionActionEntity } from './../../src/modules/role/entity/permission-action.entity';
import { TABLE_NAME } from './../constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { UserTokenType } from './../../src/modules/auth/auth.constant';
import { UserTokenEntity } from './../../src/modules/auth/entity/user-token.entity';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
    QueryRunner,
    Repository,
    getRepository,
    ObjectType,
    getConnection,
    createConnection,
} from 'typeorm';
import { Faker, faker } from '@faker-js/faker';
import glob from 'glob';
import path from 'path';
import DatabaseConfig from '~database/config';
import userFactory from './user.factory';
import userTokenFactory from './user_token.factory';
import permissionActionFactory from './permission_action.factory';
import permissionResourceFactory from './permission_resource.factory';
import permissionFactory from './permission.factory';
import roleFactory from './role.factory';
import rolePermissionFactory from './role_permission.factory';
import userRoleFactory from './user_role.factory';
import { ProductEntity } from '~product/entity/product.entity';
import productFactory from './product.factory';

interface Factory<T extends BaseEntity> {
    tableName: string;
    repo: Repository<T>;
    defineFunction: FactoryDefine<T>;
}

// let factories: Factory<BaseEntity>[] = [
//     {
//         tableName: TABLE_NAME.USER,
//         repo: getRepository(TABLE_NAME.USER),
//         defineFunction: require('./user.factory'),
//     },
// ];
type Params<T> = { [key in keyof Partial<T>]: Required<T>[key] };

export type FactoryDefine<T extends BaseEntity> = (
    params?: Params<T>,
) => Promise<T>;

export async function createEntity(queryRunner: QueryRunner) {
    const repo = queryRunner.manager.getRepository('user');
    const repoUserToken = queryRunner.manager.getRepository('user_token');
    const user = new UserEntity();
    user.fullName = 'Le Hai Quan';
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.status = UserStatus.ACTIVE;

    const userToken = new UserTokenEntity();
    await repo.insert(user);
    userToken.user = user;
    userToken.hashToken = faker.internet.password();
    userToken.type = UserTokenType.REFRESH_TOKEN;
    userToken.token = faker.internet.password();
    await repoUserToken.insert(userToken);
    return user;
}

let Factories: { [key: string]: FactoryDefine<any> } = {
    // hygen inject
    [ProductEntity.name]: productFactory,
    [UserEntity.name]: userFactory,
    [UserTokenEntity.name]: userTokenFactory,
    [PermissionActionEntity.name]: permissionActionFactory,
    [PermissionResourceEntity.name]: permissionResourceFactory,
    [PermissionEntity.name]: permissionFactory,
    [RoleEntity.name]: roleFactory,
    [RolePermissionEntity.name]: rolePermissionFactory,
    [UserRoleEntity.name]: userRoleFactory,
};
export function test() {
    glob(`**/*.factory.ts`, {}, (err, files) => {
        console.log(files);
        const relativeFiles = files.map((file) =>
            path.relative('../database/factories/', file),
        );

        for (const file of files) {
            const factory = import(`../../${file.slice(0, -3)}`);
            factory.then((res) => {
                const tableName = res?.default()?.tableName;
                Factories[tableName] = res?.default;
            });
        }
    });
}

// test();
export async function factoryExcute<T extends BaseEntity>(
    entity: ObjectType<T>,
    params?: Params<T>,
): Promise<T> {
    // const a = new (entity as any)();
    const repo = getConnection('seed').manager.getRepository(entity);

    if (params) {
        const result = await repo.findOne({ where: params });
        if (result) {
            return result;
        }
    }

    const entityName = entity.name;

    const factory = Factories[entityName];
    const e = await factory(params);

    for (const key in params) {
        e[key] = params[key];
    }

    await repo.insert(e);
    return e;
}
