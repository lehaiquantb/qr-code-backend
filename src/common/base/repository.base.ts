import { FindConditions, SelectQueryBuilder } from 'typeorm';
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository as TypeormRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Optional, ContextProvider } from '~common';
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
    abstract getDetailByFindCondition(
        findCondition: FindConditions<T>,
    ): Promise<T>;

    async isExist(where: FindConditions<T>): Promise<boolean> {
        const count = await this.count(where);
        return count > 0;
    }

    async getDetailById(id: number): Promise<T> {
        return await this.getDetailByFindCondition({ id } as any);
    }

    public async insertAndGet(
        data: QueryDeepPartialEntity<T>,
    ): Promise<Optional<T>> {
        const authUser = ContextProvider.getAuthUser();
        const insertResult = await this.insert({
            ...data,
            createdBy: authUser?.id,
        });
        const id = insertResult?.identifiers?.[0]?.id;
        if (id) {
            return await this.getDetailById(id);
        } else return undefined;
    }

    public async updateAndGet(
        f: FindConditions<T>,
        data: QueryDeepPartialEntity<T>,
    ): Promise<Optional<T>> {
        const authUser = ContextProvider.getAuthUser();

        const updateResult = await this.update(f, {
            ...data,
            updatedBy: authUser?.id,
        });
        if (updateResult?.affected > 0)
            return await this.getDetailByFindCondition(f);
        else {
            return null;
        }
    }
}
