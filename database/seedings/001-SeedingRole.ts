import {
    ModuleName,
    PermissionDefault,
} from '../../src/modules/role/role.constants';
import { UserRole } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { forEach } from 'lodash';
import { TABLE_NAME } from '../migrations/constant';

export class SeedingRole1720963593399 implements MigrationInterface {
    tableName = TABLE_NAME.Role;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            const items = [
                {
                    id: 1,
                    code: UserRole.ADMIN,
                },
                {
                    id: 2,
                    code: UserRole.TENANT,
                },
                {
                    id: 3,
                    code: UserRole.USER,
                },
            ];

            await queryRunner.manager
                .getRepository(this.tableName)
                .insert(items);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            await queryRunner.manager
                .getRepository(this.tableName)
                .delete({ name: In(Object.values(UserRole)) });
        }
    }
}
