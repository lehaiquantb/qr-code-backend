import { UserGender, UserStatus } from '../../user.constant';
import { RoleEntity } from 'src/modules/role/entity/role.entity';

export class UserResponseDto {
    id: number;
    email: string;
    fullName: string;
    birthday?: Date;
    phoneNumber?: string;
    gender?: UserGender;
    role?: RoleEntity;
    status?: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}
