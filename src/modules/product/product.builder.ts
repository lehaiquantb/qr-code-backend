import { QueryBuilder } from 'typeorm';
import { ActionEntity } from '~action/entity/action.entity';
import { BaseQueryBuilder } from '~common';
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
            .leftJoinAndMapMany(
                'product.actions',
                ActionEntity,
                'action',
                'action.productId = product.id',
            )
            .orderBy('action.createdAt', 'ASC');
    }
}
