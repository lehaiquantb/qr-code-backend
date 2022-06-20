import { Role } from 'src/modules/role/entity/role.entity';
import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: TABLE_NAME.Role_Permission })
export class RolePermission extends BaseEntity {
    @Column({ nullable: false })
    roleId: number;

    @Column({ nullable: false })
    permissionId: number;

    @ManyToOne(() => Role, (role) => role.rolePermissions)
    @JoinColumn({ name: 'roleId' })
    public role!: Role;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
    @JoinColumn({ name: 'permissionId' })
    public permission!: Permission;
}
