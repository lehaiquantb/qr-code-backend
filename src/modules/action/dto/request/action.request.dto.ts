import {
    JoiOptional,
    JoiRequired,
    JoiValidate,
    QueryParamDto,
    RequestDto,
} from '~common';
import * as Joi from 'joi';
export const ActionSchema = {
    id: Joi.number(),
};

export class CreateActionDto extends RequestDto {}

export class QueryActionDto extends QueryParamDto {}

export class QueryListActionDto extends QueryParamDto {
    @JoiRequired()
    @JoiValidate(Joi.number())
    productId: number;

    @JoiOptional()
    @JoiValidate(Joi.number().default(5))
    limit: number;

    @JoiOptional()
    @JoiValidate(Joi.number().default(0))
    lastActionId: number;
}

export class UpdateActionDto extends RequestDto {
    @JoiValidate(Joi.number().min(1).max(5).default(1))
    @JoiOptional()
    rate: number;

    @JoiValidate(Joi.string().max(255))
    @JoiOptional()
    comment: string;

    @JoiValidate(Joi.bool())
    @JoiOptional()
    isFavorite: boolean;
}
