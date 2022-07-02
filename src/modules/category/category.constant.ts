import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { CategoryEntity } from '~category/entity/category.entity';
const Joi = BaseJoi.extend(JoiDate);

export const categoryDetailAttributes: (keyof CategoryEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
