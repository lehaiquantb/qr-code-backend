import { METADATA_JOI_KEY } from '../decorators/validator.decorator';
import BaseJoi from 'joi';

export abstract class BaseDto {
    constructor() {
        console.log('');
    }

    getJoiSchema() {
        const joiObjectSchema: BaseJoi.PartialSchemaMap = {};
        Object.keys(this).forEach((item) => {
            const joiSchema: BaseJoi.AnySchema = Reflect.getMetadata(
                METADATA_JOI_KEY,
                this,
                item,
            );
            if (joiSchema) {
                joiObjectSchema[item] = joiSchema;
            } else {
                joiObjectSchema[item] = BaseJoi.any();
            }
        });

        return BaseJoi.object(joiObjectSchema);
    }
}
