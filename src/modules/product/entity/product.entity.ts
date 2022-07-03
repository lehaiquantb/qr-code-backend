import { CategoryEntity } from '~category/entity/category.entity';
import { TABLE_NAME } from '~database/constant';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '~common';
import { ProductQueryBuilder } from '~product/product.builder';
import { RateEntity } from '~rate/entity/rate.entity';

const NAME = TABLE_NAME.PRODUCT;
@Entity({ name: NAME })
export class ProductEntity extends BaseEntity {
    static builder(alias: string) {
        return new ProductQueryBuilder(ProductEntity.createQueryBuilder(alias));
    }

    @Column({ type: 'varchar', nullable: false, length: 255 })
    qrCode: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    description: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    verified: boolean;

    @OneToMany(() => RateEntity, (rate) => rate.product)
    rates!: RateEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category!: CategoryEntity;

    @Column({ type: 'int', nullable: false })
    categoryId: number;
}
