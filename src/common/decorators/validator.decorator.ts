import type { ValidationOptions } from 'class-validator';
import {
    IsPhoneNumber as isPhoneNumber,
    registerDecorator,
    ValidateIf,
} from 'class-validator';
import { isString } from 'lodash';

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
