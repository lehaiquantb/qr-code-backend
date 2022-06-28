import * as Joi from 'joi';
import { JoiValidate } from '~common';

export class LoginDto {
    @JoiValidate(Joi.string().email().required().label('auth.fields.email'))
    readonly email: string;

    @JoiValidate(Joi.string().required().label('auth.fields.password'))
    readonly password: string;
}
