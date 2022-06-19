import { RolePermission } from './role-permission.entity';
import { TABLE_NAME } from './../../../../database/migrations/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PermissionResource } from './permission-resource.entity';
import { PermissionAction } from './permission-action.entity';

@Entity({ name: TABLE_NAME.Permission })
export class Permission extends BaseEntity {
    @Column({ nullable: false })
    permissionActionId: number;

    @Column({ nullable: false })
    permissionResourceId: number;

    @ManyToOne(
        () => PermissionResource,
        (permissionResource) => permissionResource.permissions,
    )
    @JoinColumn({ name: 'permissionResourceId' })
    public permissionResource!: PermissionResource;

    @ManyToOne(
        () => PermissionAction,
        (permissionAction) => permissionAction.permissions,
    )
    @JoinColumn({ name: 'permissionActionId' })
    public permissionAction!: PermissionAction;

    @OneToMany(
        () => RolePermission,
        (rolePermission) => rolePermission.permission,
    )
    public rolePermissions!: RolePermission[];
}
