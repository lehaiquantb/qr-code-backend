import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const RateSchema = {
    id: Joi.number(),
};

export class CreateRateDto extends RequestDto {}

export class QueryRateDto extends QueryParamDto {}

export class QueryListRateDto extends QueryParamDto {}

export class UpdateRateDto extends RequestDto {}
