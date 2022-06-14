import { UserRole } from '../../src/modules/user/user.constant';
import { UserStatus } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../migrations/constant';
import { Role } from 'src/modules/role/entity/role.entity';
dotenv.config();
export class SeedingUser1720963593400 implements MigrationInterface {
    tableName = TABLE_NAME.User;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (this.needToSeed()) {
            const roleAdmin = (await queryRunner.manager
                .getRepository('role')
                .findOne({ where: { code: UserRole.ADMIN } })) as Role;
            const roleTenant = (await queryRunner.manager
                .getRepository('role')
                .findOne({ where: { code: UserRole.TENANT } })) as Role;
            const roleUser = (await queryRunner.manager
                .getRepository('role')
                .findOne({ where: { code: UserRole.USER } })) as Role;
            const userDefault = {
                fullName: 'Le Hai Quan',
                email: 'quan@gmail.com',
                password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
                status: UserStatus.ACTIVE,
                tenantId: 1,
            };
            const items = [
                {
                    ...userDefault,
                    id: 1,
                    fullName: 'Admin',
                    email: 'admin@gmail.com',
                    roleId: roleAdmin.id,
                },
                {
                    ...userDefault,
                    id: 2,
                    fullName: 'Tenant 1',
                    email: 'tenant@gmail.com',
                    roleId: roleTenant.id,
                },
                {
                    ...userDefault,
                    id: 3,
                    fullName: 'User 1',
                    email: 'user1@gmail.com',
                    roleId: roleUser.id,
                },
                {
                    ...userDefault,
                    id: 4,
                    fullName: 'User 2',
                    email: 'user2@gmail.com',
                    roleId: roleUser.id,
                },
                {
                    ...userDefault,
                    id: 5,
                    fullName: 'User 3',
                    email: 'user3@gmail.com',
                    roleId: roleUser.id,
                },
            ];

            await queryRunner.manager
                .getRepository(this.tableName)
                .insert(items);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
