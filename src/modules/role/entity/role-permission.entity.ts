import { RoleEntity } from 'src/modules/role/entity/role.entity';
import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity({ name: TABLE_NAME.Role_Permission })
export class RolePermissionEntity extends BaseEntity {
    @Column({ nullable: false })
    roleId: number;

    @Column({ nullable: false })
    permissionId: number;

    @ManyToOne(() => RoleEntity, (role) => role.rolePermissions)
    @JoinColumn({ name: 'roleId' })
    public role!: RoleEntity;

    @ManyToOne(
        () => PermissionEntity,
        (permission) => permission.rolePermissions,
    )
    @JoinColumn({ name: 'permissionId' })
    public permission!: PermissionEntity;
}
