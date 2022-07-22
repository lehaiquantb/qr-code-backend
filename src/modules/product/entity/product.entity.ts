import { CategoryEntity } from '~category/entity/category.entity';
import { TABLE_NAME } from '~database/constant';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { BaseEntity, VirtualColumn } from '~common';
import { ProductQueryBuilder } from '~product/product.builder';
import { FileEntity } from '~file/entity/file.entity';
import { ActionEntity } from '~action/entity/action.entity';
import { ProviderEntity } from '~provider/entity/provider.entity';

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

    @Column({ type: 'int', nullable: true, default: 0 })
    price: number;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    verified: boolean;

    @OneToMany(() => ActionEntity, (action) => action.product)
    actions!: ActionEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category!: CategoryEntity;

    @Column({ type: 'int', nullable: false })
    categoryId: number;

    @OneToOne(() => FileEntity)
    @JoinColumn({ name: 'imageId' })
    image!: FileEntity;

    @Column({ type: 'int', nullable: false })
    imageId: number;

    @ManyToOne(() => ProviderEntity, (provider) => provider.products)
    @JoinColumn({ name: 'providerId' })
    provider!: ProviderEntity;

    @Column({ type: 'int', nullable: false })
    providerId: number;

    @VirtualColumn({ type: 'number', default: 0 })
    averageRate: number;
}
