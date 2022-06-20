import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: TABLE_NAME.Permission_Resource })
export class PermissionResource extends BaseEntity {
    @Column({ length: 255, nullable: false })
    resource: string;

    @OneToMany(() => Permission, (permission) => permission)
    public permissions!: Permission[];
}
