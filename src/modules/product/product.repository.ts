import { EntityRepository, FindConditions } from 'typeorm';
import { BaseRepository } from '~common';
import { ProductEntity } from '~product/entity/product.entity';
import { ProductQueryBuilder } from '~product/product.builder';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
    async getDetailByFindCondition(
        findCondition: FindConditions<ProductEntity>,
    ): Promise<ProductEntity> {
        const product = await this.builder('product')
            .where(findCondition)
            .queryDetail()
            .getOneEntity();
        return product;
    }

    builder(alias: string): ProductQueryBuilder {
        return new ProductQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
