import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { ActionEntity } from '~action/entity/action.entity';
const Joi = BaseJoi.extend(JoiDate);

export const actionDetailAttributes: (keyof ActionEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
