import { FindConditions, SelectQueryBuilder } from 'typeorm';
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository as TypeormRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Optional } from '~common';
import { BaseEntity } from '../entites/BaseEntity';

interface IRepository<T extends BaseEntity> {
    // findOne(id: number): Promise<T>;
}

export abstract class BaseRepository<T extends BaseEntity>
    extends TypeormRepository<T>
    implements IRepository<T>
{
    constructor() {
        super();
    }

    abstract builder(alias: string): SelectQueryBuilder<T>;

    async isExist(where: FindConditions<T>): Promise<boolean> {
        const count = await this.count(where);
        return count > 0;
    }

    public async insertAndGet(data: QueryDeepPartialEntity<T>): Promise<T> {
        const insertResult = await this.insert(data);
        const id = insertResult?.identifiers?.[0]?.id;
        return await this.findOne(id);
    }

    public async updateAndGet(
        f: FindConditions<T>,
        data: QueryDeepPartialEntity<T>,
    ): Promise<Optional<T>> {
        const updateResult = await this.update(f, data);

        if (updateResult?.affected > 0) return await this.findOne(f);
        else {
            return null;
        }
    }
}
