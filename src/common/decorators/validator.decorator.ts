import { Reflector } from '@nestjs/core';
import type { ValidationOptions } from 'class-validator';
import {
    IsPhoneNumber as isPhoneNumber,
    registerDecorator,
    ValidateIf,
} from 'class-validator';
import { isString } from 'lodash';
import * as BaseJoi from 'joi';

export function IsPassword(
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (object, propertyName: string) => {
        registerDecorator({
            propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string) {
                    return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
                },
            },
        });
    };
}

export const METADATA_JOI_KEY = Symbol('METADATA_JOI_KEY');

export function Joi(schema: BaseJoi.AnySchema): PropertyDecorator {
    return (target, propertyName: string) => {
        Reflect.defineMetadata(METADATA_JOI_KEY, schema, target, propertyName);
    };
}
