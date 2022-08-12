import * as Joi from 'joi';
import { RequestDto, JoiValidate, Password, JoiRequired } from '~common';

export class LoginDto extends RequestDto {
    @JoiValidate(Joi.string().email().required().label('auth.fields.email'))
    readonly email: string;

    @Password()
    @JoiRequired()
    readonly password: string;
}
