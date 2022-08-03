import { translate } from '~i18n';
import { ValidationException } from './../exceptions/validation.exception';
import {
    Catch,
    ArgumentsHost,
    HttpException,
    Inject,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { BaseExceptionFilter } from '@nestjs/core';
import { uniqueId } from 'lodash';
import { ValidationErrorItem } from 'joi';
import {
    HttpStatus,
    LANGUAGES,
    IErrorResponse,
    IErrorDetail,
    NotFoundException,
    BadRequestException as CustomBadRequestException,
} from '~common';
import { unwrapJoiMessage } from '~plugins';
const getLanguage = (request: Request): string => {
    const lang = request?.headers['accept-language'];
    const supportedLanguages = Object.values(LANGUAGES) as string[];
    return supportedLanguages.includes(lang) ? lang : LANGUAGES.EN;
};

const translateErrorValidator = async (
    errors: ValidationErrorItem[],
    i18n: I18nRequestScopeService,
): Promise<IErrorDetail[]> => {
    const errorMessages = await Promise.all(
        errors.map(async (error: ValidationErrorItem) => {
            const { type, context, path, message } = error;
            let messageTranslated = '';

            const customMessage = unwrapJoiMessage(message);
            if (customMessage) {
                messageTranslated = customMessage;
            } else {
                const key = ['validation', type].join('.');
                // translate label
                context.label = i18n.translate(context.label);
                // translate message
                if (context.name) {
                    messageTranslated = i18n.translate(context.name, {
                        args: context,
                    });
                } else {
                    messageTranslated = i18n.translate(key, { args: context });
                }
            }

            return {
                key: path.join('.'),
                errorCode: HttpStatus.BAD_REQUEST,
                message: messageTranslated,
            };
        }),
    );

    return errorMessages;
};

const handleBadRequestException = async (
    exception: BadRequestException,
    request: Request,
    i18n: I18nRequestScopeService,
): Promise<IErrorResponse> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = exception.getResponse() as any;
    let errors: IErrorDetail[] = [];

    if (Array.isArray(response.errors) && response?.errors.length > 0) {
        errors = await translateErrorValidator(response.errors, i18n);
    }
    return {
        code: HttpStatus.BAD_REQUEST,
        message: exception.message,
        errors,
    };
};

const handleInternalErrorException = async (
    exception: InternalServerErrorException,
    request: Request,
    logger: Logger,
    i18n: I18nRequestScopeService,
): Promise<IErrorResponse> => {
    const logId = `${Date.now()}${uniqueId()}`;
    const message = `System error with id = ${logId}: ${exception.message}`;
    // write detail log to trace bug
    logger.error(message, {
        requestUrl: request.url,
        request: request.body,
        exception,
    });
    // return only logId
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18n.translate('errors.500', {
            lang: getLanguage(request),
            args: { param: logId },
        }),
        errors: [],
    };
};

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly i18n: I18nRequestScopeService,
        private readonly configService: ConfigService,
    ) {
        super();
    }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exceptionResponse = exception.getResponse() as any;
        const status = exception.getStatus();
        let res: IErrorResponse = {
            code: exception.getStatus(),
            message: this.i18n.translate(`errors.${status}`, {
                lang: getLanguage(request),
            }),
            errors: exceptionResponse?.errors ?? [],
        };

        console.log(exceptionResponse);

        this.logger.error(exceptionResponse.message, {
            requestUrl: request.url,
            request: request.body,
            exception,
        });

        if (exception instanceof InternalServerErrorException) {
            res = await handleInternalErrorException(
                exception,
                request,
                this.logger,
                this.i18n,
            );
        } else if (exception instanceof BadRequestException) {
            res = await handleBadRequestException(
                exception,
                request,
                this.i18n,
            );
        } else if (exception instanceof ValidationException) {
            res = await handleBadRequestException(
                exception,
                request,
                this.i18n,
            );
        } else if (
            exception instanceof NotFoundException ||
            exception instanceof CustomBadRequestException
        ) {
            res = {
                errors: [],
                message: translate(exception.message),
                code: status,
            };
        }
        return response.status(status).json(res);
    }
}
