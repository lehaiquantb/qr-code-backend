import * as Joi from 'joi';
import { RequestDto, JoiValidate } from '~common';

export class LoginDto extends RequestDto {
    @JoiValidate(Joi.string().email().required().label('auth.fields.email'))
    readonly email: string;

    @JoiValidate(Joi.string().required().label('auth.fields.password'))
    readonly password: string;
}
