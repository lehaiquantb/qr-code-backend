import { BaseEntity } from 'src/common/entites/BaseEntity';
import { QueryBuilder, SelectQueryBuilder } from 'typeorm';

export abstract class BaseQueryBuilder<
    T extends BaseEntity,
> extends SelectQueryBuilder<T> {
    constructor(queryBuilder: QueryBuilder<T>) {
        super(queryBuilder);
    }
}
