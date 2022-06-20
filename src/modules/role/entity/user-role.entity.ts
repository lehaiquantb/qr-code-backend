import { TABLE_NAME } from '../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Role } from './role.entity';

@Entity({ name: TABLE_NAME.User_Role })
export class UserRole extends BaseEntity {
    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    roleId: number;

    @ManyToOne(() => User, (user) => user.userRoles)
    @JoinColumn({ name: 'userId' })
    public user!: User;

    @ManyToOne(() => Role, (role) => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    public role!: Role;
}
