import {
    QueryParamDto,
    RequestDto,
    ORDER_DIRECTION,
    JoiEnum,
    JoiOptional,
    MAX_PAGE_LIMIT,
    MIN_PAGE,
    MAX_PAGE,
    MIN_PAGE_LIMIT,
    JoiArray,
} from '~common';
import * as Joi from 'joi';
import { PRODUCT_ORDER_BY } from '~product/product.constant';
export const ProductSchema = {
    id: Joi.number(),
};

export class CreateProductDto extends RequestDto {}

export class QueryProductDto extends QueryParamDto {}

export class QueryListProductDto extends QueryParamDto {
    @JoiEnum(ORDER_DIRECTION, Joi.string().default(ORDER_DIRECTION.ASC))
    @JoiOptional()
    orderDirection: ORDER_DIRECTION;

    @JoiEnum(PRODUCT_ORDER_BY, Joi.string().default(PRODUCT_ORDER_BY[0]))
    @JoiOptional()
    orderBy: string;

    @JoiOptional(Joi.number().min(MIN_PAGE).max(MAX_PAGE).default(MIN_PAGE))
    page: number;

    @JoiOptional(
        Joi.number()
            .min(MIN_PAGE_LIMIT)
            .max(MAX_PAGE_LIMIT)
            .default(MIN_PAGE_LIMIT),
    )
    limit: number;

    @JoiOptional(Joi.string().max(255).default(''))
    keyword: string;

    @JoiArray(Joi.number(), Joi.array().default([]))
    categoryId: number[];
}

export class UpdateProductDto extends RequestDto {}
