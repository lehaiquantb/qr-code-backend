import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import {
    TEXTAREA_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    BIRTHDAY_MIN_DATE,
    PHONE_NUMBER_REGEX,
    DATE_FORMAT,
    INPUT_PHONE_MAX_LENGTH,
    Birthday,
    PhoneNumber,
    JoiEnum,
    JoiOptional,
} from '~common';
import { UserGender } from '../../../user/user.constant';
import { JoiValidate, RequestBodyDto } from '~common';

export const updateProfileSchema = Joi.object({
    fullName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('auth.fields.name'),
    birthday: Joi.date()
        .format(DATE_FORMAT.YYYY_MM_DD_HYPHEN)
        .min(BIRTHDAY_MIN_DATE)
        .less('now')
        .optional()
        .label('auth.fields.birthday')
        .allow(null),
    phoneNumber: Joi.string()
        .regex(PHONE_NUMBER_REGEX)
        .max(INPUT_PHONE_MAX_LENGTH)
        .optional()
        .label('auth.fields.phone')
        .allow(null),
    address: Joi.string()
        .allow('')
        .max(TEXTAREA_MAX_LENGTH)
        .optional()
        .label('auth.fields.address')
        .allow(null),
    gender: Joi.string()
        .valid(...Object.values(UserGender))
        .required()
        .label('auth.fields.gender'),
});

export class UpdateProfileDto extends RequestBodyDto {
    @JoiValidate(Joi.string())
    @JoiOptional()
    fullName: string;

    @Birthday()
    @JoiOptional()
    birthday: Date;

    @PhoneNumber()
    @JoiOptional()
    phoneNumber?: string;

    @JoiEnum(UserGender)
    @JoiOptional()
    gender?: UserGender;
}
