import { QueryBuilder } from 'typeorm';
import { ActionEntity } from '~action/entity/action.entity';
import { BaseQueryBuilder } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProductEntity } from './entity/product.entity';

export class ProductQueryBuilder extends BaseQueryBuilder<ProductEntity> {
    constructor(queryBuilder: QueryBuilder<ProductEntity>) {
        super(queryBuilder);
    }

    public filterByCategoryId(categoryId: number): this {
        return this.filterByColumn('categoryId', categoryId);
    }

    public whereCategoryIdIn(categoryIds: number[]): this {
        return this.whereIn('categoryId', categoryIds);
    }

    public queryDetail(): this {
        return this.leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.image', 'image')
            .leftJoinAndMapOne(
                'product.provider',
                ProviderEntity,
                'provider',
                'provider.id = product.providerId',
            )
            .leftJoinAndMapMany(
                'product.actions',
                ActionEntity,
                'action',
                'action.productId = product.id',
            )
            .groupBy('action.productId')
            .addSelect('AVG(action.rate)', 'averageRate')
            .orderBy('action.createdAt', 'ASC');
    }
}
