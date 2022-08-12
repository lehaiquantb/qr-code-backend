import { userFields, UserGender } from '../../user.constant';

import {
    JoiEnum,
    JoiOptional,
    JoiValidate,
    Password,
    RequestDto,
} from '~common';
export class CreateUserDto extends RequestDto {
    @JoiValidate(userFields.email)
    email: string;

    @JoiValidate(userFields.fullName)
    fullName: string;

    @Password()
    @JoiOptional()
    password: string;

    @JoiValidate(userFields.phoneNumber)
    phoneNumber: string;

    @JoiValidate(userFields.birthday)
    birthday?: Date;

    @JoiEnum(UserGender, userFields.gender)
    gender?: UserGender;
}
