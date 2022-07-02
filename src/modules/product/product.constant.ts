import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { ProductEntity } from '~product/entity/product.entity';
const Joi = BaseJoi.extend(JoiDate);

export const productDetailAttributes: (keyof ProductEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
