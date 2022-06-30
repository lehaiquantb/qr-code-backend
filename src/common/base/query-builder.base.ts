import { columnsWithAlias } from '~common';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { QueryBuilder, SelectQueryBuilder } from 'typeorm';

export abstract class BaseQueryBuilder<
    T extends BaseEntity,
> extends SelectQueryBuilder<T> {
    constructor(queryBuilder: QueryBuilder<T>) {
        super(queryBuilder);
    }

    selectColumns(
        cWAs: { alias: string; columns: string[] }[],
    ): SelectQueryBuilder<T> {
        return this.select(columnsWithAlias(cWAs));
    }
}
