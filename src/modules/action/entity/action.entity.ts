import { TABLE_NAME } from '~database/constant';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~common';
import { ActionQueryBuilder } from '~action/action.builder';
import { UserEntity } from '~user/entity/user.entity';
import { ProductEntity } from '~product/entity/product.entity';

const NAME = TABLE_NAME.ACTION;
@Entity({ name: NAME })
export class ActionEntity extends BaseEntity {
    static builder(alias: string) {
        return new ActionQueryBuilder(ActionEntity.createQueryBuilder(alias));
    }

    @Column({ type: 'int', nullable: false, default: 1 })
    rate: number;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    comment: string;

    @Column({ type: 'bool', default: false })
    isFavorite: boolean;

    @Column({ type: 'int', nullable: false })
    productId: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.actions)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;
}
