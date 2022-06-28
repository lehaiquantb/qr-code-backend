import { Injectable } from '@nestjs/common';
import { HttpStatus } from '~common';
import { translate, I18Key } from '~i18n';
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

export class SuccessResponse {
    constructor(data = {}, message = DEFAULT_SUCCESS_MESSAGE) {
        return {
            code: HttpStatus.OK,
            message,
            data,
        };
    }
}

export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message = '',
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            errors,
            message: translate(message as I18Key),
        };
    }
}
