import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { FileEntity } from '~file/entity/file.entity';
const Joi = BaseJoi.extend(JoiDate);

export const fileDetailAttributes: (keyof FileEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
