import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { ProviderEntity } from '~provider/entity/provider.entity';
const Joi = BaseJoi.extend(JoiDate);

export enum ProviderStatus {
    ACCEPT = 'ACCEPT',
    REJECT = 'REJECT',
    WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
}

export const providerDetailAttributes: (keyof ProviderEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
