import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const ActionSchema = {
    id: Joi.number(),
};

export class CreateActionDto extends RequestDto {}

export class QueryActionDto extends QueryParamDto {}

export class QueryListActionDto extends QueryParamDto {}

export class UpdateActionDto extends RequestDto {}
