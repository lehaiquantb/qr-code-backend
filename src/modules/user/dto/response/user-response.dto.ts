import { ResponseDto } from './../../../../common/base/dto.base';
import { UserGender, UserStatus } from '../../user.constant';
import { UserEntity } from '~user/entity/user.entity';
import { OmitProperty } from '~common';

export class UserResponseDto extends ResponseDto {
    id: number;
    email: string;
    fullName: string;
    birthday?: Date;
    phoneNumber?: string;
    gender?: UserGender;
    status?: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;

    @OmitProperty()
    private user?: UserEntity;

    constructor(user?: UserEntity) {
        super();
        this.user = user;
        this.id = user.id;
        this.email = user.email;
        this.fullName = user.fullName;
        this.birthday = user.birthday;
        this.phoneNumber = user.phoneNumber;
        this.gender = user.gender;
        this.status = user.status;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
