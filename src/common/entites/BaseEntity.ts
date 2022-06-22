import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity as TypeOrmBaseEntity,
    SelectQueryBuilder,
} from 'typeorm';

interface IEntity {
    builder: any;
}
export abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    createdBy: number;

    @Column({ nullable: true })
    updatedBy: number;

    @Column({ nullable: true })
    deletedBy: number;

    static tableName(): string {
        return this.getRepository().metadata.tableName;
    }

    static queryBuilder(): SelectQueryBuilder<TypeOrmBaseEntity> {
        return this.createQueryBuilder(this.tableName());
    }
}
