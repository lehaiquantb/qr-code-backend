import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const FileSchema = {
    id: Joi.number(),
};

export class CreateFileDto extends RequestDto {}

export class QueryFileDto extends QueryParamDto {}

export class QueryListFileDto extends QueryParamDto {}

export class UpdateFileDto extends RequestDto {}
