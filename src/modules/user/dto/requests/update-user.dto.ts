import { UserStatus } from './../../user.constant';
import { Joi } from '~plugins';
import { userFields, UserGender } from '../../user.constant';
import {
    Birthday,
    JoiEnum,
    JoiOptional,
    JoiValidate,
    PHONE_NUMBER_REGEX,
    RequestBodyDto,
} from '~common';

export const UpdateUserSchema = Joi.object().keys({
    ...userFields,
    gender: Joi.string()
        .valid(...Object.values(UserGender))
        .required()
        .label('auth.fields.gender'),
});

export class UpdateUserDto extends RequestBodyDto {
    @JoiValidate(Joi.string().max(255).min(1))
    @JoiOptional()
    fullName: string;

    @JoiValidate(Joi.string().regex(PHONE_NUMBER_REGEX))
    @JoiOptional()
    phoneNumber: string;

    @Birthday()
    @JoiOptional()
    birthday: Date;

    @JoiEnum(UserGender)
    @JoiOptional()
    gender: UserGender;

    @JoiEnum(UserStatus)
    @JoiOptional()
    status: UserStatus;
}
