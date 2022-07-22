import { ProviderStatus } from './../provider.constant';
import { TABLE_NAME } from '~database/constant';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '~common';
import { ProviderQueryBuilder } from '~provider/provider.builder';
import { ProductEntity } from '~product/entity/product.entity';
import { UserEntity } from '~user/entity/user.entity';
import { FileEntity } from '~file/entity/file.entity';

const NAME = TABLE_NAME.PROVIDER;
@Entity({ name: NAME })
export class ProviderEntity extends BaseEntity {
    static builder(alias: string) {
        return new ProviderQueryBuilder(
            ProviderEntity.createQueryBuilder(alias),
        );
    }

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'longtext' })
    address: string;

    @Column({ type: 'longtext' })
    description: string;

    @Column({
        type: 'enum',
        enum: ProviderStatus,
        default: ProviderStatus.WAITING_FOR_APPROVAL,
    })
    status: ProviderStatus;

    @OneToOne(() => FileEntity)
    @JoinColumn({ name: 'licenseImageId' })
    licenseImage!: FileEntity;

    @Column({ type: 'int', nullable: false })
    licenseImageId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'ownerId' })
    owner!: UserEntity;

    @Column({ type: 'int', nullable: false })
    ownerId: number;

    @OneToMany(() => ProductEntity, (product) => product.provider)
    products: ProductEntity;
}
