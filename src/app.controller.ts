import { UserGender } from './modules/user/user.constant';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiObject, JoiOptional, JoiValidate } from '~common';
import Joi from 'joi';
import { BaseDto } from '~common';
import { ApiProperty } from '@nestjs/swagger';
// import { Is} from 'class-validator'
class ItemDto extends BaseDto {
    @ApiProperty()
    @JoiValidate(Joi.string().required())
    name: string;
}

class MyObject extends BaseDto {
    prop1: string;
}
export class TestDto extends BaseDto {
    // if use ValidationPipe, this required all property use decorator in class-validator because ValidationPipe effect to transform value of JoiValidationPipe
    // @IsPassword({ message: 'Password must be a string' })
    name: string;

    @ApiProperty()
    @JoiOptional(Joi.number())
    hello: string;

    @JoiValidate(Joi.number().default(1))
    kkk: number;

    @ApiProperty({ type: ItemDto, isArray: true })
    @JoiValidate(
        Joi.array()
            .items(ItemDto.getJoiSchema().required())
            .default([{ name: 'ad' }]),
    )
    items: ItemDto[];

    @JoiObject(ItemDto)
    item2s: ItemDto;

    @JoiValidate(Joi.string().valid(...Object.values(UserGender)))
    gender: UserGender;

    // @JoiValidate(Joi.object(MyObject.getJoiSchema()))
    // myObject: MyObject
    // static asd() {
    //     type a = keyof TestDto;

    // }
}

@Controller('/')
export class AppController {
    @Get('/ping')
    pingAlive() {
        return 'pong';
    }

    @Post('/test-validator')
    testValidator(@Body() body: TestDto) {
        // const schema = Joi.number().negative().optional()
        // debugger
        return body;
    }
}
