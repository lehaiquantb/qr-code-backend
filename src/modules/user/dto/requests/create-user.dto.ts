import { userFields, UserGender } from '../../user.constant';

import { JoiEnum, JoiValidate } from '~common';
export class CreateUserDto {
    @JoiValidate(userFields.email)
    email: string;

    @JoiValidate(userFields.fullName)
    fullName: string;

    @JoiValidate(userFields.password)
    password: string;

    @JoiValidate(userFields.phoneNumber)
    phoneNumber: string;

    @JoiValidate(userFields.birthday)
    birthday?: Date;

    @JoiValidate(userFields.gender)
    @JoiEnum(UserGender)
    gender?: UserGender;
}
