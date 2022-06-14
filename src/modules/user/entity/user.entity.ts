import { Role } from '../../role/entity/role.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { UserStatus, UserGender } from '../user.constant';

import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/entites/BaseEntity';
@Entity({ name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    roleId: number;

    @Column({ nullable: true })
    tenantId: number;

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

    @ManyToOne(() => Role)
    @JoinColumn({
        name: 'roleId',
    })
    role: Role;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.WAITING_FOR_APPROVAL,
    })
    status: UserStatus;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({
        name: 'tenantId',
    })
    tenant: User;

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
