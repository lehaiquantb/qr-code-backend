import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    email: Joi.string().email().required().label('auth.fields.email'),
    password: Joi.string().required().label('auth.fields.password'),
});
export class LoginDto {
    readonly email: string;
    readonly password: string;
}
