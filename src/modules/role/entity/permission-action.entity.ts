import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: TABLE_NAME.Permission_Action })
export class PermissionAction extends BaseEntity {
    @Column({ length: 255, nullable: false })
    action: string;

    @OneToMany(() => Permission, (permission) => permission)
    public permissions!: Permission[];
}
