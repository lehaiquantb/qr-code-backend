import { createColumns } from './../constant';
import { UserTokenType } from '../../src/modules/auth/auth.constant';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from '../constant';

const a = {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
};
export class UserToken1632891593013 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.User_Token,
                columns: createColumns([
                    {
                        name: 'hashToken',
                        type: 'varchar',
                        length: '2000',
                    },
                    {
                        name: 'userId',
                        type: 'int',
                    },
                    {
                        name: 'token',
                        type: 'blob',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(UserTokenType),
                        default: `'${UserTokenType.REFRESH_TOKEN}'`,
                    },
                ]),
            }),
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.User_Token,
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: TABLE_NAME.User,
                referencedColumnNames: ['id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.User_Token);
    }
}
