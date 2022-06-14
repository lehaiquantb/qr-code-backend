import * as Joi from 'joi';

export const GoogleLoginSchema = Joi.object({
    code: Joi.string().required().label('auth.fields.google.code'),
    redirectUri: Joi.string()
        .uri()
        .required()
        .label('auth.fields.google.redirectUri'),
});
export class GoogleLoginDto {
    readonly code: string;
    readonly redirectUri: string;
}
