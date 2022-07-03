import { FileEntity } from '~file/entity/file.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, Params } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();

export let fileList: Params<FileEntity>[] = [
    {
        id: 1,
        fileName: 'pepsi.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/pepsi.jpg?alt=media&token=9b597517-0bb4-4331-996b-c8eec370a899',
        size: 4443,
        mimeType: 'image/jpg',
    },
    {
        id: 2,
        fileName: 'neptune.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/neptune.png?alt=media&token=7e6f8f63-5587-42b3-8f02-ef364f46bd36',
        size: 4000443,
        mimeType: 'image/png',
    },
    {
        id: 3,
        fileName: '3.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/duahau.png?alt=media&token=db0533ad-0363-4da5-a47a-f23faffce2c1',
        size: 114443,
        mimeType: 'image/png',
    },
    {
        id: 4,
        fileName: '4.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/suonheo.png?alt=media&token=472d00a9-96aa-4dcc-bf03-d5c31c21dc98',
        size: 234443,
        mimeType: 'image/png',
    },
    {
        id: 5,
        fileName: '5.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/itbook.jpg?alt=media&token=175f5f87-4eb7-4b72-b786-bbaf5faa7165',
        size: 3443,
        mimeType: 'image/jpg',
    },
    {
        id: 6,
        fileName: '6.jpg',
        url: 'https://firebasestorage.googleapis.com/v0/b/quanlh-49a4f.appspot.com/o/ctxmvdtt.jpg?alt=media&token=b70f7f19-e767-4b46-9e21-db13a61ab1af',
        size: 43443,
        mimeType: 'image/jpg',
    },
];

export class File_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = fileList.map(async (item) =>
            factoryExcute(FileEntity, item),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.FILE).clear()
    }
}
