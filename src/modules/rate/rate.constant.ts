import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { RateEntity } from '~rate/entity/rate.entity';
const Joi = BaseJoi.extend(JoiDate);

export const rateDetailAttributes: (keyof RateEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
