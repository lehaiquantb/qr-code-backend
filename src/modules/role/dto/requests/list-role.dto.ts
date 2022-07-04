import { MIN_PAGE_LIMIT } from './../../../../common/constants/constants';
import * as Joi from 'joi';
import {
    INPUT_TEXT_MAX_LENGTH,
    MIN_PAGE,
    ORDER_DIRECTION,
} from 'src/common/constants/constants';

export const RoleListQueryStringSchema = Joi.object().keys({
    page: Joi.number().optional().min(MIN_PAGE),
    limit: Joi.number().optional().min(MIN_PAGE_LIMIT),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    orderBy: Joi.string().optional(),
    orderDirection: Joi.string()
        .valid(ORDER_DIRECTION.ASC, ORDER_DIRECTION.DESC)
        .optional(),
});

export class RoleListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
}
