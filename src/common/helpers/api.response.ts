import { ResponseDto } from './../base/dto.base';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '~common';
import { translate, I18Key } from '~i18n';
import _ from 'lodash';
const DEFAULT_SUCCESS_MESSAGE = 'success';
@Injectable()
export class ApiResponse<T> {
    public code: number;
    public message: string;
    public data: T;
    public errors: T;
}

export class CommonListResponse<T> {
    items: T[];
    totalItems: number;
}

export interface IErrorResponse {
    key: string;
    errorCode: number;
    message: string;
}

export class SuccessResponse<T extends ResponseDto> {
    constructor(data: T | any, message = DEFAULT_SUCCESS_MESSAGE) {
        let response: any = {};
        if (data instanceof ResponseDto) {
            const omitProperties: string[] =
                (data.constructor as any)?.getOmitProperties() ?? [];
            response = _.omit(data, omitProperties);
        }

        return {
            code: HttpStatus.OK,
            message,
            data: response,
        };
    }
}

export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message: I18Key = '',
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            errors,
            message: translate(message),
        };
    }
}

export function notFoundResponse() {
    return new ErrorResponse(HttpStatus.NOT_FOUND, 'notFound');
}
