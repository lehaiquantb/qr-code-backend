import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PermissionEntity } from './permission.entity';
const NAME = TABLE_NAME.PERMISSION_ACTION;
@Entity({ name: NAME })
export class PermissionActionEntity extends BaseEntity {
    @Column({ length: 255, nullable: false })
    action: string;

    @OneToMany(() => PermissionEntity, (permission) => permission)
    public permissions!: PermissionEntity[];
}
