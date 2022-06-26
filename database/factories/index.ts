import { TABLE_NAME } from './../constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { UserTokenType } from './../../src/modules/auth/auth.constant';
import { UserTokenEntity } from './../../src/modules/auth/entity/user-token.entity';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { QueryRunner, Repository, getRepository, ObjectType, getConnection } from 'typeorm';
import { Faker, faker } from '@faker-js/faker';
import glob from 'glob';
import path from 'path';

import { DataSource } from "typeorm"
import DatabaseConfig from '~database/config';



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

export type FactoryDefine<T extends BaseEntity> =  () => Promise<T>;

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

let factories: { [key: string]: FactoryDefine<any> } = {};
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
                factories[tableName] = res?.default
            });
        }
    });
}

// test();

export async function factoryExcute<T extends BaseEntity>(
    entity: ObjectType<T>,
): Promise<T> {
    // console.log(factories);
    // (entity as any).useConnection(getConnection('seed'))
    // const a = new (entity as any)();
    // console.log((entity as any).tableName('seed'));
    console.log( getConnection('seed').manager.getRepository(UserTokenEntity).metadata.tableName);
    
    // const tableName = a.tableName;
    // const u = new UserTokenEntity();
    // console.log(a.tableName);
    // console.log(UserTokenEntity.tableName);
    
    // const factory = factories[tableName];
    // const enti = await factory();
    
    // const repo = getConnection('seed').getRepository(tableName)
    // await repo.insert(enti);
    // await repo.insert(entity);
    return null;
}


