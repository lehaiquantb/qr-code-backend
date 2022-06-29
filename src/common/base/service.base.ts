import { I18nService } from 'nestjs-i18n';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BaseService {
    @Inject()
    readonly i18n: I18nService;

    @Inject()
    readonly configService: ConfigService;

    constructor() {
        console.log('');
    }
}
