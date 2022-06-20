import { createColumns } from './../constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '../constant';

export class Role1632891593008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.Role,
                columns: createColumns([
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                ]),
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.Role);
    }
}
