import { TABLE_NAME } from '~database/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~common';
import { CategoryQueryBuilder } from '~category/category.builder';
import { ProductEntity } from '~product/entity/product.entity';

const NAME = TABLE_NAME.CATEGORY;
@Entity({ name: NAME })
export class CategoryEntity extends BaseEntity {
    static builder(alias: string) {
        return new CategoryQueryBuilder(
            CategoryEntity.createQueryBuilder(alias),
        );
    }

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
}
