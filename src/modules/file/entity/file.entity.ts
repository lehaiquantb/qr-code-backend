import { TABLE_NAME } from '~database/constant';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~common';
import { FileQueryBuilder } from '~file/file.builder';

const NAME = TABLE_NAME.FILE;
@Entity({ name: NAME })
export class FileEntity extends BaseEntity {
    static builder(alias: string) {
        return new FileQueryBuilder(FileEntity.createQueryBuilder(alias));
    }

    @Column({ type: 'varchar', length: 255 })
    fileName: string;

    @Column({ type: 'varchar', length: 255 })
    url: string;

    @Column({ type: 'int', default: 0 })
    size: number;

    @Column({ type: 'varchar', length: 255 })
    mimeType: string;
}
