import {
    INPUT_TEXT_MAX_LENGTH,
    JoiRequired,
    QueryParamDto,
    RequestDto,
} from '~common';
import * as Joi from 'joi';
export const FileSchema = {
    id: Joi.number(),
};

export class CreateFileDto extends RequestDto {
    @JoiRequired(Joi.string().max(INPUT_TEXT_MAX_LENGTH))
    fileName: string;

    @JoiRequired(Joi.string().uri().max(INPUT_TEXT_MAX_LENGTH))
    url: string;

    @JoiRequired(Joi.number().positive())
    size: number;

    @JoiRequired(Joi.string().max(INPUT_TEXT_MAX_LENGTH))
    mimeType: string;
}

export class QueryFileDto extends QueryParamDto {}

export class QueryListFileDto extends QueryParamDto {}

export class UpdateFileDto extends RequestDto {}
