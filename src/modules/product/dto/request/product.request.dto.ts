import {
    QueryParamDto,
    RequestDto,
    ORDER_DIRECTION,
    JoiEnum,
    JoiOptional,
    MAX_LIMIT,
    MIN_PAGE,
    MAX_PAGE,
    MIN_LIMIT,
    JoiArray,
    JoiValidate,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_ORDER_BY,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
} from '~common';
import * as Joi from 'joi';
import { PRODUCT_ORDER_BY } from '~product/product.constant';
export const ProductSchema = {
    id: Joi.number(),
};

export class CreateProductDto extends RequestDto {}

export class QueryProductDto extends QueryParamDto {}

export class QueryListProductDto extends QueryParamDto {
    @JoiEnum(ORDER_DIRECTION, Joi.string().default(DEFAULT_ORDER_DIRECTION))
    @JoiOptional()
    orderDirection: ORDER_DIRECTION;

    @JoiEnum(PRODUCT_ORDER_BY, Joi.string().default(DEFAULT_ORDER_BY))
    @JoiOptional()
    orderBy: string;

    @JoiOptional(Joi.number().min(MIN_PAGE).max(MAX_PAGE).default(DEFAULT_PAGE))
    page: number;

    @JoiOptional(
        Joi.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
    )
    limit: number;

    @JoiOptional(Joi.string().max(255).default(''))
    keyword: string;

    @JoiArray(Joi.number(), Joi.array().default([]))
    @JoiOptional()
    categoryIds: number[];

    @JoiValidate(Joi.string().default(null))
    @JoiOptional()
    lastOrderValue: string;
}

export class UpdateProductDto extends RequestDto {}
