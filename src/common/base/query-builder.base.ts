import { columnsWithAlias } from '~common';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { QueryBuilder, SelectQueryBuilder } from 'typeorm';

type ColumnOfEntity<T> = keyof T;
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

    protected filterByColumn(columnName: ColumnOfEntity<T>, value: any) {
        return this.where(
            `${this.alias}.${columnName as string} = :${columnName as string}`,
            {
                [columnName]: value,
            },
        );
    }
}
