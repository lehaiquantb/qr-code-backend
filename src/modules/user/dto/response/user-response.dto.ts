import { UserGender, UserStatus } from '../../user.constant';
import { Role } from 'src/modules/role/entity/role.entity';

export class UserResponseDto {
    id: number;
    email: string;
    fullName: string;
    birthday?: Date;
    phoneNumber?: string;
    gender?: UserGender;
    role?: Role;
    status?: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}
