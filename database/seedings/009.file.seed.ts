import { FileEntity } from '~file/entity/file.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, Params } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();

export let fileList: Params<FileEntity>[] = [
    {
        id: 1,
    },
];

export class File_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = fileList.map(async (item) =>
            factoryExcute(FileEntity, {
                ...item,
            }),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.FILE).clear()
    }
}
