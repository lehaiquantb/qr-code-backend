import {
    INPUT_TEXT_MAX_LENGTH,
    JoiRequired,
    Limit,
    OrderBy,
    OrderDirection,
    ORDER_DIRECTION,
    Page,
    QueryParamDto,
    RequestDto,
    SearchKeyword,
} from '~common';
import * as Joi from 'joi';
export const CategorySchema = {
    id: Joi.number(),
};

export class CreateCategoryDto extends RequestDto {
    @JoiRequired(Joi.string().max(INPUT_TEXT_MAX_LENGTH))
    name: string;

    @JoiRequired(Joi.string().max(INPUT_TEXT_MAX_LENGTH))
    description: string;
}

export class QueryCategoryDto extends QueryParamDto {}

export class QueryListCategoryDto extends QueryParamDto {
    @Page()
    page: number;

    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @OrderBy()
    orderBy: string;

    @OrderDirection()
    orderDirection: ORDER_DIRECTION;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
