import { TABLE_NAME } from './../../../../database/constant';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { UserTokenType } from '../auth.constant';

@Entity({ name: TABLE_NAME.User_Token })
export class UserTokenEntity extends BaseEntity {
    @Column()
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    // hash token value to find faster
    @Column({ length: 2000 })
    hashToken: string;

    @Column({ type: 'blob' })
    token: string;

    @Column({
        type: 'enum',
        enum: UserTokenType,
        default: UserTokenType.REFRESH_TOKEN,
    })
    type: UserTokenType;
}
