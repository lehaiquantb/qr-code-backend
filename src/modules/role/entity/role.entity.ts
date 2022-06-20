import { RolePermission } from './role-permission.entity';
import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: TABLE_NAME.Role })
export class Role extends BaseEntity {
    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    description: string;

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles!: UserRole[];

    @OneToMany(
        () => RolePermission,
        (rolePermission) => rolePermission.permission,
    )
    rolePermissions!: RolePermission[];
}
