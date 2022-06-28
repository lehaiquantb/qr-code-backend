import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { ObjectSchema, ValidationResult, ValidationError } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema?: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const metatype = metadata?.metatype;
        if (metatype && !this.schema && (metatype as any)?.getJoiSchema) {
            this.schema = (metatype as any)?.getJoiSchema();
        }

        if (this.schema) {
            const validationResult = this.schema.validate(value, {
                abortEarly: false,
            }) as ValidationResult;

            if (validationResult.error) {
                const { details } = validationResult.error as ValidationError;
                throw new BadRequestException({ errors: details });
            } else {
                return validationResult.value;
            }
        }

        return value;
    }
}
