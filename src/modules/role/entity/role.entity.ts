import { RolePermissionEntity } from './role-permission.entity';
import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

const NAME = TABLE_NAME.ROLE;

@Entity({ name: NAME })
export class RoleEntity extends BaseEntity {
    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    description: string;

    @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
    userRoles!: UserRoleEntity[];

    @OneToMany(
        () => RolePermissionEntity,
        (rolePermission) => rolePermission.permission,
    )
    rolePermissions!: RolePermissionEntity[];
}
