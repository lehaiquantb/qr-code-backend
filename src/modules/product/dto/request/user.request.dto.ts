import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const ProductSchema = {
    id: Joi.number(),
};

export class CreateProductDto extends RequestDto {}

export class QueryProductDto extends QueryParamDto {}

export class QueryListProductDto extends QueryParamDto {}

export class UpdateProductDto extends RequestDto {}
