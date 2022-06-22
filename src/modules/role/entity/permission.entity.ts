import { RolePermissionEntity } from './role-permission.entity';
import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PermissionResourceEntity } from './permission-resource.entity';
import { PermissionActionEntity } from './permission-action.entity';

const NAME = TABLE_NAME.PERMISSION;

@Entity({ name: NAME })
export class PermissionEntity extends BaseEntity {
    @Column({ nullable: false })
    permissionActionId: number;

    @Column({ nullable: false })
    permissionResourceId: number;

    @ManyToOne(
        () => PermissionResourceEntity,
        (permissionResource) => permissionResource.permissions,
    )
    @JoinColumn({ name: 'permissionResourceId' })
    public permissionResource!: PermissionResourceEntity;

    @ManyToOne(
        () => PermissionActionEntity,
        (permissionAction) => permissionAction.permissions,
    )
    @JoinColumn({ name: 'permissionActionId' })
    public permissionAction!: PermissionActionEntity;

    @OneToMany(
        () => RolePermissionEntity,
        (rolePermission) => rolePermission.permission,
    )
    public rolePermissions!: RolePermissionEntity[];
}
