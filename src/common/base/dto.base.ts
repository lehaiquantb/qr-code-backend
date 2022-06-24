import { METADATA_JOI_KEY } from '../decorators/validator.decorator';
import BaseJoi from 'joi';
interface Base<T> {
    new (): T;
}
export class BaseDto {
    constructor() {
        console.log('');
    }

    static getJoiSchema() {
        const joiObjectSchema: BaseJoi.PartialSchemaMap = this.getJoiObject();
        return BaseJoi.object(joiObjectSchema);
    }

    static getJoiObject() {
        return Reflect.getMetadata(METADATA_JOI_KEY, this.prototype) ?? {};
    }
}
