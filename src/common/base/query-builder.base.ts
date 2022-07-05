import { ColumnOfEntity, columnsWithAlias } from '~common';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Brackets, Like, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';
export abstract class BaseQueryBuilder<
    T extends BaseEntity,
> extends SelectQueryBuilder<T> {
    constructor(queryBuilder: QueryBuilder<T>) {
        super(queryBuilder);
    }

    withAlias(columnName: string) {
        return `${this.alias}.${columnName}`;
    }

    selectColumns(
        cWAs: { alias: string; columns: string[] | string }[],
    ): SelectQueryBuilder<T> {
        return this.select(columnsWithAlias(cWAs));
    }

    filterByColumn(columnName: ColumnOfEntity<T>, value: any) {
        return this.where(
            `${this.alias}.${columnName as string} = :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    whereIn(columnName: ColumnOfEntity<T>, value: any[]): this {
        const columnListAlias = `${columnName as string}List`;
        if (value?.length === 0) {
            return this;
        }
        return this.where(
            `${this.alias}.${columnName as string} IN (:...${columnListAlias})`,
            {
                [columnListAlias]: value,
            },
        );
    }

    search(columnNames: ColumnOfEntity<T>[], keyword: string): this {
        const searchColumns = columnNames as string[];
        return this.where(
            new Brackets((qb) => {
                qb.where(
                    searchColumns.map((searchColumn) => ({
                        [searchColumn]: Like(`%${keyword}%`),
                    })),
                );
            }),
        );
    }

    greaterThan(columnName: ColumnOfEntity<T>, value: any): this {
        if (_.isEmpty(value)) return this;

        return this.where(
            `${this.alias}.${columnName as string} > :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    lessThan(columnName: ColumnOfEntity<T>, value: any): this {
        if (_.isEmpty(value)) return this;

        return this.where(
            `${this.alias}.${columnName as string} < :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    orderByColumn(
        columnName: ColumnOfEntity<T>,
        orderDirection: 'ASC' | 'DESC',
    ): this {
        return this.orderBy(
            `${this.alias}.${columnName as string}`,
            orderDirection,
        );
    }
}
