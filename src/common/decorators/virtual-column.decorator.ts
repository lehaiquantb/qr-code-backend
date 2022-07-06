import { METADATA_KEY } from '../constants';

export function VirtualColumn(name?: string): PropertyDecorator {
    return (target, propertyKey) => {
        const metaInfo =
            Reflect.getMetadata(METADATA_KEY.VIRTUAL_COLUMN, target) || {};

        metaInfo[propertyKey] = name ?? propertyKey;

        Reflect.defineMetadata(METADATA_KEY.VIRTUAL_COLUMN, metaInfo, target);
    };
}
