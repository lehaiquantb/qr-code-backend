import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { ObjectSchema, ValidationResult, ValidationError } from 'joi';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema?: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const metatype = metadata?.metatype;
        debugger;
        if (metatype && !this.schema) {
            const entity = plainToInstance(metatype, value);
            this.schema = entity?.getJoiSchema();
        }

        if (this.schema) {
            const { error } = this.schema.validate(value, {
                abortEarly: false,
            }) as ValidationResult;
            if (error) {
                const { details } = error as ValidationError;
                throw new BadRequestException({ errors: details });
            }
        }

        return value;
    }
}
