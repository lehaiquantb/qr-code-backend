import { BaseDto } from '~common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';
import * as Joi from 'joi';

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

type JoiValidateOptions = ApiPropertyOptions;
export const METADATA_JOI_KEY = Symbol('METADATA_JOI_KEY');
export type JoiObjectSchema = { [key: string]: Joi.AnySchema };

export function JoiValidate(
    schema: Joi.AnySchema,
    options?: JoiValidateOptions,
): PropertyDecorator {
    const apiProperty = ApiProperty(options);
    const JoiDecorator: PropertyDecorator = (target, propertyName: string) => {
        const joiObject: JoiObjectSchema =
            Reflect.getMetadata(METADATA_JOI_KEY, target) ?? {};
        if (joiObject[propertyName]) {
            joiObject[propertyName] = joiObject[propertyName].concat(schema);
        } else {
            joiObject[propertyName] = schema;
        }
        Reflect.defineMetadata(METADATA_JOI_KEY, joiObject, target);
    };

    return applyDecorators(...[JoiDecorator, apiProperty]);
}

export function JoiOptional(schema?: Joi.AnySchema): PropertyDecorator {
    return schema
        ? JoiValidate(schema.optional(), { required: false })
        : JoiValidate(Joi.optional(), { required: false });
}

export function JoiRequired(schema?: Joi.AnySchema): PropertyDecorator {
    return schema
        ? JoiValidate(schema.required(), { required: true })
        : JoiValidate(Joi.required(), { required: true });
}

export function JoiArray<T extends BaseDto>(dtoClass: T): PropertyDecorator {
    const decorators = [
        JoiValidate(Joi.array().items((dtoClass as any)?.getJoiSchema())),
        ApiProperty({ isArray: true, type: dtoClass }),
    ];
    return applyDecorators(...decorators);
}

export function JoiObject<T extends BaseDto>(dtoClass: T): PropertyDecorator {
    const decorators = [
        JoiValidate(Joi.object((dtoClass as any)?.getJoiObject())),
        ApiProperty({ isArray: false, type: dtoClass }),
    ];
    return applyDecorators(...decorators);
}

// export function JoiEnum(enum: any): PropertyDecorator {
//     return schema ? JoiValidate(schema.required(),{required:true}) : JoiValidate(Joi.required(),{required:true});
// }
