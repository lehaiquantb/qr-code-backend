import { METADATA_KEY } from '~common';
import BaseJoi from 'joi';

export class BaseDto {
    constructor() {
        console.log('');
    }

    static getJoiSchema() {
        const joiObjectSchema: BaseJoi.PartialSchemaMap = this.getJoiObject();
        return BaseJoi.object(joiObjectSchema);
    }

    static getJoiObject() {
        return Reflect.getMetadata(METADATA_KEY.JOI, this.prototype) ?? {};
    }
}
