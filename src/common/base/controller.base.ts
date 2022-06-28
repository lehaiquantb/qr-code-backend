import { I18Key } from './../../i18n/index';
import { Controller, Inject } from '@nestjs/common';
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
}
