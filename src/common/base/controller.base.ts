import { I18Key } from './../../i18n/index';
import { Controller } from '@nestjs/common';
import { I18nRequestScopeService, TranslateOptions } from 'nestjs-i18n';

@Controller()
export class BaseController {
    readonly i18n: I18nRequestScopeService;

    translate(key: I18Key, options?: TranslateOptions): string {
        return this.i18n.translate(key, options);
    }

    constructor(private readonly i18nService?: I18nRequestScopeService) {
        this.i18n = i18nService;
    }
}
