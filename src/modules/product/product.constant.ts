import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { ProductEntity } from '~product/entity/product.entity';
import { ColumnOfEntity } from '~common';
const Joi = BaseJoi.extend(JoiDate);

export const productDetailAttributes: (keyof ProductEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];

export const PRODUCT_ORDER_BY: ColumnOfEntity<ProductEntity>[] = [
    'id',
    'createdAt',
    'name',
];
