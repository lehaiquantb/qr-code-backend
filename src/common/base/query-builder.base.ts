import { VirtualColumnOptions } from './../decorators/virtual-column.decorator';
import {
    ColumnOfEntity,
    columnsWithAlias,
    ColumnOfEntityWithAlias,
    METADATA_KEY,
} from '~common';
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

    async getManyEntity(): Promise<T[]> {
        const { entities, raw } = await this.getRawAndEntities();
        const items = entities.map((entitiy, index) => {
            const metaInfo =
                Reflect.getMetadata(METADATA_KEY.VIRTUAL_COLUMN, entitiy) ?? {};
            const item = raw[index];

            for (const [
                propertyKey,
                options,
            ] of Object.entries<VirtualColumnOptions>(metaInfo)) {
                const columnName = options.name;

                switch (options.type) {
                    case 'number':
                        entitiy[propertyKey] = _.toNumberDefault(
                            item[columnName],
                            options.default,
                        );
                        break;
                    default:
                        entitiy[propertyKey] = item[columnName];
                        break;
                }
            }
            return entitiy;
        });

        return [...items];
    }

    async getOneEntity(): Promise<T> {
        const { entities, raw } = await this.getRawAndEntities();
        const metaInfo =
            Reflect.getMetadata(METADATA_KEY.VIRTUAL_COLUMN, entities[0]) ?? {};

        for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
            entities[0][propertyKey] = raw[0][name];
        }

        return entities[0];
    }

    selectColumns<CustomEntity extends BaseEntity = T>(
        cWAs:
            | ColumnOfEntityWithAlias<CustomEntity>[]
            | ColumnOfEntityWithAlias<CustomEntity>,
    ): this {
        if (_.isArray(cWAs)) {
            return this.select(columnsWithAlias(cWAs));
        } else return this.select(columnsWithAlias([cWAs]));
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
