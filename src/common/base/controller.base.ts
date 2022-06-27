import { Controller } from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Controller()
export class BaseController {
    readonly i18n: I18nRequestScopeService;

    constructor(private readonly i18nService?: I18nRequestScopeService) {
        this.i18n = i18nService;
    }
}
