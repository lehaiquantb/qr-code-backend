import { TABLE_NAME } from '~database/constant';
import { Entity } from 'typeorm';
import { BaseEntity } from '~common';
import { ProductQueryBuilder } from '~product/product.builder';

const NAME = TABLE_NAME.USER;
@Entity({ name: NAME })
export class ProductEntity extends BaseEntity {
    static builder(alias: string) {
        return new ProductQueryBuilder(ProductEntity.createQueryBuilder(alias));
    }
}
