import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiValidate } from '~common';
import Joi from 'joi';
import { BaseDto } from '~common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '~user/entity/user.entity';

export class TestDto extends BaseDto {
    // if use ValidationPipe, this required all property use decorator in class-validator because ValidationPipe effect to transform value of JoiValidationPipe
    // @IsPassword({ message: 'Password must be a string' })
    name: string;

    @ApiProperty()
    hello: string;

    @ApiProperty()
    @JoiValidate(Joi.number().negative())
    kkk: number;
}

@Controller('/')
export class AppController {
    @Get('/ping')
    pingAlive() {
        return 'pong';
    }

    @Post('/test-validator')
    testValidator(@Body() body: TestDto) {
        console.log(UserEntity.tableName());
        return body;
    }
}
