import { BaseDto, convertEnumToValues } from '~common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';
import * as Joi from 'joi';
import { METADATA_KEY } from '~common';
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

export type JoiObjectSchema = { [key: string]: Joi.AnySchema };

export function JoiValidate(
    schema: Joi.AnySchema,
    options?: JoiValidateOptions,
): PropertyDecorator {
    const apiProperty = ApiProperty(options);
    const JoiDecorator: PropertyDecorator = (target, propertyName: string) => {
        const joiObject: JoiObjectSchema =
            Reflect.getMetadata(METADATA_KEY.JOI, target) ?? {};
        if (joiObject[propertyName]) {
            joiObject[propertyName] = joiObject[propertyName].concat(schema);
        } else {
            joiObject[propertyName] = schema;
        }
        Reflect.defineMetadata(METADATA_KEY.JOI, joiObject, target);
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

export function JoiArray<T extends BaseDto>(
    dtoClass: T,
    schema?: Joi.ArraySchema,
): PropertyDecorator {
    const joiSchema = Joi.array()
        .items((dtoClass as any)?.getJoiSchema())
        .concat(schema);
    const decorators = [
        JoiValidate(joiSchema),
        ApiProperty({ isArray: true, type: dtoClass }),
    ];
    return applyDecorators(...decorators);
}

export function JoiObject<T extends BaseDto>(
    dtoClass: T,
    schema?: Joi.ObjectSchema,
): PropertyDecorator {
    let joiSchema = Joi.object((dtoClass as any)?.getJoiObject());
    if (schema) joiSchema = joiSchema.concat(schema);
    const decorators = [
        JoiValidate(joiSchema),
        ApiProperty({ isArray: false, type: dtoClass }),
    ];
    return applyDecorators(...decorators);
}

export function JoiEnum(
    joyEnum: any,
    schema?: Joi.AnySchema,
): PropertyDecorator {
    let joiSchema = Joi.any();
    if (schema) joiSchema = joiSchema.concat(schema);
    joiSchema = joiSchema.valid(...Object.values(joyEnum));
    const validValues = convertEnumToValues(joyEnum);

    const decorators = [
        JoiValidate(joiSchema),
        ApiProperty({ enum: validValues }),
    ];
    return applyDecorators(...decorators);
}
