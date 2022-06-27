import * as Nestjs18n from 'nestjs-i18n';
declare module 'nestjs-i18n' {
    declare;
    Nestjs18n;
    interface I18nRequestScopeService {
        t<T = any>(key: I18Key, options?: TranslateOptions): T;
    }
}
