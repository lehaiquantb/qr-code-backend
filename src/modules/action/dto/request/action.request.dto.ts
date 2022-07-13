import { JoiOptional, JoiValidate, QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const ActionSchema = {
    id: Joi.number(),
};

export class CreateActionDto extends RequestDto {}

export class QueryActionDto extends QueryParamDto {}

export class QueryListActionDto extends QueryParamDto {}

export class UpdateActionDto extends RequestDto {
    @JoiValidate(Joi.number().min(0).max(5))
    @JoiOptional()
    rate: number;

    @JoiValidate(Joi.string().max(255))
    @JoiOptional()
    comment: string;

    @JoiValidate(Joi.bool())
    @JoiOptional()
    isFavorite: boolean;
}
