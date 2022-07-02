import { RoleEntity } from '../../src/modules/role/entity/role.entity';
import {
    ROLE_TYPE,
} from '../../src/modules/role/role.interface';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class Role_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(RoleEntity, {
                name: ROLE_TYPE.ADMIN,
                description: 'Administrator role for system',
            }),
            factoryExcute(RoleEntity, {
                name: ROLE_TYPE.MEMBER,
                description: 'Member role',
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
