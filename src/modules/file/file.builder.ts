import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { FileEntity } from '~file/entity/file.entity';

export class FileQueryBuilder extends BaseQueryBuilder<FileEntity> {
    constructor(queryBuilder: QueryBuilder<FileEntity>) {
        super(queryBuilder);
    }
}
