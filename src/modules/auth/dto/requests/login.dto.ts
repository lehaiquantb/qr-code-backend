import * as Joi from 'joi';
import { BaseDto, JoiValidate } from '~common';

export class LoginDto extends BaseDto {
    @JoiValidate(Joi.string().email().required().label('auth.fields.email'))
    readonly email: string;

    @JoiValidate(Joi.string().required().label('auth.fields.password'))
    readonly password: string;
}
