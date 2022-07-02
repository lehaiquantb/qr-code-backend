import { ProductEntity } from '~product/entity/product.entity';
import { UserEntity } from '~user/entity/user.entity';
import { TABLE_NAME } from '~database/constant';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~common';
import { RateQueryBuilder } from '~rate/rate.builder';

const NAME = TABLE_NAME.RATE;
@Entity({ name: NAME })
export class RateEntity extends BaseEntity {
    static builder(alias: string) {
        return new RateQueryBuilder(RateEntity.createQueryBuilder(alias));
    }

    @Column({ type: 'int', nullable: false, default: 0 })
    rate: number;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    comment: string;

    @Column({ type: 'int', nullable: false })
    productId: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.rates)
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.rates)
    product: ProductEntity;
}
