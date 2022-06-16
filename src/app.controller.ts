import { METADATA_JOI_KEY } from './common/decorators/validator.decorator';
import { JoiValidationPipe } from './common/pipes/joi.validation.pipe';
import { Body, Controller, Get } from '@nestjs/common';
import { IsPassword, Joi } from './common/decorators';
import * as BaseJoi from 'joi';
import { BaseDto } from './common/base/base.dto';
import { IsNumber } from 'class-validator';
export class TestDto extends BaseDto {
    // if use ValidationPipe, this required all property use decorator in class-validator because ValidationPipe effect to transform value of JoiValidationPipe
    // @IsPassword({ message: 'Password must be a string' })
    name: string;

    hello: string;

    @Joi(BaseJoi.number().negative())
    kkk: number;
}

@Controller('/')
export class AppController {
    @Get('/ping')
    pingAlive() {
        return 'pong';
    }

    @Get('/test-validator')
    testValidator(@Body() body: TestDto) {
        return body;
    }
}
