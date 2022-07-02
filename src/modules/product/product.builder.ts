import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { ProductEntity } from './entity/product.entity';

export class ProductQueryBuilder extends BaseQueryBuilder<ProductEntity> {
    constructor(queryBuilder: QueryBuilder<ProductEntity>) {
        super(queryBuilder);
    }
}
