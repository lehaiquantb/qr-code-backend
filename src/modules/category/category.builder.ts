import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';

export class CategoryQueryBuilder extends BaseQueryBuilder<CategoryEntity> {
    constructor(queryBuilder: QueryBuilder<CategoryEntity>) {
        super(queryBuilder);
    }
}
