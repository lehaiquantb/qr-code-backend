import { TABLE_NAME } from './../../../../database/constant';
import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { UserStatus, UserGender } from '../user.constant';

import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { UserRoleEntity } from 'src/modules/role/entity/user-role.entity';
@Entity({ name: TABLE_NAME.User })
export class UserEntity extends BaseEntity {
    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ length: 255, nullable: true })
    password: string;

    @Column({ length: 255, nullable: false })
    fullName: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ length: 255, nullable: true })
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: UserGender,
        nullable: true,
    })
    gender: UserGender;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.WAITING_FOR_APPROVAL,
    })
    status: UserStatus;

    @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
    userRoles!: UserRoleEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(
                this.password,
                bcrypt.genSaltSync(10),
            );
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
