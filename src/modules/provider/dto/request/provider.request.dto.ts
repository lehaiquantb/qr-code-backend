import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const ProviderSchema = {
    id: Joi.number(),
};

export class CreateProviderDto extends RequestDto {}

export class QueryProviderDto extends QueryParamDto {}

export class QueryListProviderDto extends QueryParamDto {}

export class UpdateProviderDto extends RequestDto {}
