import { Body, Controller, Get } from '@nestjs/common';
import { Joi } from './common/decorators';
import * as BaseJoi from 'joi';
import { BaseDto, IsPassword } from '~common';
export class TestDto extends BaseDto {
    // if use ValidationPipe, this required all property use decorator in class-validator because ValidationPipe effect to transform value of JoiValidationPipe
    // @IsPassword({ message: 'Password must be a string' })
    name: string;

    @IsPassword()
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
