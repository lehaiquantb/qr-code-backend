import { RoleEntity } from './../../src/modules/role/entity/role.entity';
import { PermissionResourceEntity } from './../../src/modules/role/entity/permission-resource.entity';
import {
    DEFAULT_ROLE,
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from './../../src/modules/role/role.interface';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class Role_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(RoleEntity, {
                name: DEFAULT_ROLE.ADMIN,
                description: 'Administrator role for system',
            }),
            factoryExcute(RoleEntity, {
                name: DEFAULT_ROLE.MEMBER,
                description: 'Member role',
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
