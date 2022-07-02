import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const CategorySchema = {
    id: Joi.number(),
};

export class CreateCategoryDto extends RequestDto {}

export class QueryCategoryDto extends QueryParamDto {}

export class QueryListCategoryDto extends QueryParamDto {}

export class UpdateCategoryDto extends RequestDto {}
