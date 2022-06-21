import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PermissionEntity } from './permission.entity';
@Entity({ name: TABLE_NAME.Permission_Resource })
export class PermissionResourceEntity extends BaseEntity {
    @Column({ length: 255, nullable: false })
    resource: string;

    @OneToMany(() => PermissionEntity, (permission) => permission)
    public permissions!: PermissionEntity[];
}
