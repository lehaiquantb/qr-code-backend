import { Global, Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '~common';
import { TransformInterceptor } from '~common';
import { CommonService } from './services/common.service';

const commonProviders = [
    {
        provide: 'cmss',
        useClass: CommonService,
    },
];

@Global()
@Module({
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        ...commonProviders,
    ],
    exports: [...commonProviders],
})
export class CommonModule {}
