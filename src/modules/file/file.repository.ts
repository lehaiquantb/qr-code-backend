import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { FileEntity } from '~file/entity/file.entity';
import { FileQueryBuilder } from '~file/file.builder';

@EntityRepository(FileEntity)
export class FileRepository extends BaseRepository<FileEntity> {
    builder(alias: string): FileQueryBuilder {
        return new FileQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
