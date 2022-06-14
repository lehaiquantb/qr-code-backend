import * as Joi from 'joi';

export const GoogleLoginLinkSchema = Joi.object({
    state: Joi.string().label('auth.fields.google.state'),
    redirectUri: Joi.string()
        .uri()
        .required()
        .label('auth.fields.google.redirectUri'),
});
export class GoogleLoginLinkDto {
    readonly state: string;
    readonly redirectUri: string;
}
