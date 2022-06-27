import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiValidate, BaseController } from '~common';
import Joi from 'joi';
import { BaseDto } from '~common';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto extends BaseDto {
    @ApiProperty()
    @JoiValidate(Joi.string().required().label(23))
    name: string;
}

class MyObject extends BaseDto {
    prop1: string;
}
export class TestDto extends BaseDto {
    // if use ValidationPipe, this required all property use decorator in class-validator because ValidationPipe effect to transform value of JoiValidationPipe
    // @IsPassword({ message: 'Password must be a string' })
    name: string;

    // @JoiOptional(Joi.number())
    // hello: string;

    // @JoiValidate(Joi.number().default(1))
    // kkk: number;

    // @JoiValidate(
    //     Joi.array()
    //         .items(ItemDto.getJoiSchema().required())
    //         .default([{ name: 'ad' }]),
    // )
    // items: ItemDto[];

    // @JoiObject(ItemDto, Joi.object().required())
    // @JoiRequired()
    // item2s: ItemDto;

    // @JoiEnum(UserGender, Joi.string().required())
    // gender: UserGender;

    // @JoiValidate(Joi.object(MyObject.getJoiSchema()))
    // myObject: MyObject
    // static asd() {
    //     type a = keyof TestDto;

    // }
}

@Controller('/')
export class AppController extends BaseController {
    @Get('/ping')
    pingAlive() {
        return this.i18n.translate('role.common.error.role.notFound');
    }

    @Post('/test-validator')
    testValidator(@Body() body: TestDto) {
        // const schema = Joi.number().negative().optional()
        // test();
        console.log(body);
        return body;
    }
}
