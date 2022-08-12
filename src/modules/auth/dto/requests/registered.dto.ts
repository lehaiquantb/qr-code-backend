import { ROLE_TYPE } from './../../../../common/constants/permission.constant';
import {
    Birthday,
    EMAIL_REGEX,
    INPUT_PHONE_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    JoiEnum,
    JoiOptional,
    JoiRequired,
    JoiValidate,
    Password,
    PHONE_NUMBER_REGEX,
    RequestBodyDto,
} from '~common';
import * as Joi from 'joi';
import { userFields, UserGender } from '~user/user.constant';

export class RegisteredUserDto extends RequestBodyDto {
    @JoiRequired(
        Joi.string()
            .regex(EMAIL_REGEX)
            .max(INPUT_TEXT_MAX_LENGTH)
            .label('user.fields.email'),
    )
    email: string;

    @JoiValidate(userFields.fullName)
    fullName: string;

    @Password()
    @JoiRequired()
    password: string;

    @JoiRequired(
        Joi.string()
            .allow(null)
            .regex(RegExp(PHONE_NUMBER_REGEX))
            .max(INPUT_PHONE_MAX_LENGTH)
            .label('user.fields.phoneNumber'),
    )
    phoneNumber: string;

    @Birthday()
    @JoiRequired()
    birthday?: Date;

    @JoiEnum(UserGender)
    @JoiRequired()
    gender?: UserGender;

    @JoiEnum(
        [ROLE_TYPE.MEMBER, ROLE_TYPE.PROVIDER],
        Joi.string().default(ROLE_TYPE.MEMBER),
    )
    @JoiOptional()
    role?: ROLE_TYPE;
}
