import { UserRepository } from './modules/user/user.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiValidate, BaseController, columnsWithAlias } from '~common';
import Joi from 'joi';
import { BaseDto } from '~common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '~user/entity/user.entity';
import { usersAttributes } from '~auth/services/auth.service';
class ItemDto extends BaseDto {
    @ApiProperty()
    @JoiValidate(Joi.string().required().label('dsa'))
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
    constructor(readonly userRepository: UserRepository) {
        super();
    }

    @Get('/ping')
    pingAlive() {
        return this.userRepository
            .builder('user')
            .filterByEmail('quanlh@gmail.com')
            .select(columnsWithAlias('user', usersAttributes))
            .leftJoinAndSelect('user.userRoles', 'userRole')
            .leftJoinAndSelect('userRole.role', 'user.userRoles[0].role')
            .getOne();
    }

    @Post('/test-validator')
    testValidator(@Body() body: TestDto) {
        console.log(body);
        const user = UserEntity.builder('user')
            .filterByEmail('Pierce_Paucek@hotmail.com')
            .getOne();

        // const user = UserRoleEntity.builder('user_role')
        //     .where('user_id = :user_id', { user_id: 1 })
        //     .getOne();
        return user;
    }
}
