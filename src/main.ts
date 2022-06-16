import { ValidationException } from './common/exceptions/validation.exception';
import { NODE_ENV } from './common/constants';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import express from 'express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../src/common/config/config-key';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
    HttpStatus,
    UnprocessableEntityException,
    ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(helmet());
    // set up CORS
    const configService: ConfigService = app.get(ConfigService);
    const corsOptions: CorsOptions = {
        origin: configService.get(ConfigKey.CORS_WHITE_LIST),
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'accept-language',
            'X-Timezone',
            'X-Timezone-Name',
        ],
        optionsSuccessStatus: 200,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };
    app.enableCors(corsOptions);
    // setup prefix of route
    app.setGlobalPrefix(configService.get(ConfigKey.BASE_PATH));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            dismissDefaultMessages: true,
            exceptionFactory: (errors) => new ValidationException(errors),
        }),
    );

    // setup max request size
    app.use(
        express.json({ limit: configService.get(ConfigKey.MAX_REQUEST_SIZE) }),
    );
    app.use(
        express.urlencoded({
            limit: configService.get(ConfigKey.MAX_REQUEST_SIZE),
            extended: true,
        }),
    );
    // use winston for logger
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    //swagger ui
    if (configService.get(ConfigKey.NODE_ENV) === NODE_ENV.DEVELOPMENT) {
        const config = new DocumentBuilder()
            .setTitle('Example')
            .setDescription('API description')
            .setVersion('1.0')
            .addTag('example')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/swagger', app, document);
    }

    await app.listen(configService.get(ConfigKey.PORT));
}

bootstrap();
