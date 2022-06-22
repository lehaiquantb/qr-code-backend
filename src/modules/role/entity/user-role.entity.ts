import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { RoleEntity } from './role.entity';

const NAME = TABLE_NAME.USER_ROLE;

@Entity({ name: NAME })
export class UserRoleEntity extends BaseEntity {
    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    roleId: number;

    @ManyToOne(() => UserEntity, (user) => user.userRoles)
    @JoinColumn({ name: 'userId' })
    public user!: UserEntity;

    @ManyToOne(() => RoleEntity, (role) => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    public role!: RoleEntity;
}
