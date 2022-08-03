import { EntityRepository, FindConditions } from 'typeorm';
import { BaseRepository } from '~common';
import { FileEntity } from '~file/entity/file.entity';
import { FileQueryBuilder } from '~file/file.builder';

@EntityRepository(FileEntity)
export class FileRepository extends BaseRepository<FileEntity> {
    async getDetailByFindCondition(
        findCondition: FindConditions<FileEntity>,
    ): Promise<FileEntity> {
        return this.findOne(findCondition);
    }
    builder(alias: string): FileQueryBuilder {
        return new FileQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
