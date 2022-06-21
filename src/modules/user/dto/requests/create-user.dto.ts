import { userFields, UserGender } from '../../user.constant';

import * as Joi from 'joi';
import {
    INPUT_TEXT_MAX_LENGTH,
    EMAIL_REGEX,
} from 'src/common/constants/constants';
export const CreateUserSchema = Joi.object().keys({
    ...userFields,
    email: Joi.string()
        .regex(EMAIL_REGEX)
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.email'),
    password: Joi.string()
        .allow(null)
        .min(8)
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .label('user.fields.password'),
    gender: Joi.string()
        .valid(...Object.values(UserGender))
        .required()
        .label('user.fields.gender'),
});
export class CreateUserDto {
    email: string;
    fullName: string;
    password?: string;
    phoneNumber: string;
    birthday?: Date;
    gender?: UserGender;
    roleId?: number;
}
