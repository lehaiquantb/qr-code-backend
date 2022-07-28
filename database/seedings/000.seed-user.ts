import { TABLE_NAME } from '~database/constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { UserTokenEntity } from '../../src/modules/auth/entity/user-token.entity';
import { UserGender, UserStatus } from '../../src/modules/user/user.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { createEntity, factoryExcute } from '~database/factories';
import { generateHashToken, genPassword } from '~common';
dotenv.config();
export class SeedingUser_1720963593420 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(UserEntity, {
                id: 1,
                email: 'quanlh.admin@gmail.com',
                password: genPassword('123456'),
                fullName: 'Quan Le Admin',
                phoneNumber: '0987654321',
                status: UserStatus.ACTIVE,
                gender: UserGender.MALE,
            }),
            factoryExcute(UserEntity, {
                id: 2,
                email: 'quanlh.member@gmail.com',
                password: genPassword('123456'),
                fullName: 'Quan Le Member',
                phoneNumber: '0987654322',
                status: UserStatus.ACTIVE,
                gender: UserGender.MALE,
            }),
            factoryExcute(UserEntity, { id: 3, gender: UserGender.FEMALE }),
            factoryExcute(UserEntity, { id: 4, gender: UserGender.OTHER }),
            factoryExcute(UserEntity, {
                id: 5,
                status: UserStatus.WAITING_FOR_APPROVAL,
            }),
        ];
        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.USER).clear();
    }
}
