import {
    QueryParamDto,
    RequestDto,
    ORDER_DIRECTION,
    JoiOptional,
    JoiArray,
    DEFAULT_ORDER_BY,
    Id,
    OrderBy,
    OrderDirection,
    Limit,
    Page,
    SearchKeyword,
} from '~common';
import * as Joi from 'joi';
import { PRODUCT_ORDER_BY } from '~product/product.constant';
export const ProductSchema = {
    id: Joi.number(),
};

export class CreateProductDto extends RequestDto {}

export class QueryProductDto extends QueryParamDto {}

export class QueryListProductDto extends QueryParamDto {
    @OrderDirection()
    orderDirection: ORDER_DIRECTION;

    @OrderBy({
        values: PRODUCT_ORDER_BY as string[],
        default: DEFAULT_ORDER_BY,
    })
    orderBy: string;

    @Page()
    page: number;

    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @JoiArray(Number, Joi.array().default([]))
    @JoiOptional()
    categoryIds: number[];

    @JoiArray(Joi.number(), Joi.array().default([]))
    @JoiOptional()
    providerIds?: number[];
}

export class QueryListLazyLoadProductDto extends QueryParamDto {
    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @JoiArray(Joi.number(), Joi.array().default([]))
    @JoiOptional()
    categoryIds: number[];

    @JoiOptional(Joi.number().default(Number.MAX_SAFE_INTEGER))
    @Id()
    lastOrderId?: number;
}

export class QueryListOwnerProductDto extends QueryParamDto {
    @OrderDirection()
    orderDirection: ORDER_DIRECTION;

    @OrderBy({
        values: PRODUCT_ORDER_BY as string[],
        default: DEFAULT_ORDER_BY,
    })
    orderBy: string;

    @Page()
    page: number;

    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @JoiArray(Joi.number(), Joi.array().default([]))
    @JoiOptional()
    categoryIds: number[];
}

export class UpdateProductDto extends RequestDto {}
