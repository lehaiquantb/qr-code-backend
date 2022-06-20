import { createColumns } from './../constant';
import { UserGender, UserStatus } from '../../src/modules/user/user.constant';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from '../constant';

export class UserRole1632891593011 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.User_Role,
                columns: createColumns([
                    {
                        name: 'userId',
                        type: 'int',
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                    },
                ]),
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.User_Role,
            new TableForeignKey({
                columnNames: ['roleId'],
                referencedTableName: TABLE_NAME.Role,
                referencedColumnNames: ['id'],
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.User_Role,
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: TABLE_NAME.User,
                referencedColumnNames: ['id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.User_Role);
    }
}
