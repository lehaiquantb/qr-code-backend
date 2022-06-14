import { UserGender, UserStatus } from '../../src/modules/user/user.constant';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from './constant';

export class User1632891593011 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.User,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'fullName',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'birthday',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'phoneNumber',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: Object.values(UserGender),
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(UserStatus),
                        default: `'${UserStatus.WAITING_FOR_APPROVAL}'`,
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'updatedBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'deletedBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'tenantId',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.User,
            new TableForeignKey({
                columnNames: ['roleId'],
                referencedTableName: TABLE_NAME.Role,
                referencedColumnNames: ['id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.User);
    }
}
