import { I18Key } from './../../i18n/index';
import {
    Controller,
    HttpException,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
import { I18nRequestScopeService, TranslateOptions } from 'nestjs-i18n';

@Controller()
export class BaseController {
    @Inject()
    readonly i18n: I18nRequestScopeService;

    translate(key: I18Key, options?: TranslateOptions): string {
        return this.i18n.translate(key.toString(), options);
    }

    constructor() {
        console.log('');
    }

    handleError(error: Error) {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new InternalServerErrorException(error);
    }
}
