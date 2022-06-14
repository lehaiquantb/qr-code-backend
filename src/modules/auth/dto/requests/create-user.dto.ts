import * as Joi from 'joi';
export const CreateUserSchema = Joi.object().keys({
    name: Joi.string().max(255).optional(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).required(),
});
export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
