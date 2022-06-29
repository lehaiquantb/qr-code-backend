import { EMAIL_REGEX } from './../../common/constants';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import {
    INPUT_TEXT_MAX_LENGTH,
    BIRTHDAY_MIN_DATE,
    PHONE_NUMBER_REGEX,
    INPUT_PHONE_MAX_LENGTH,
} from '../../common/constants/constants';
import { UserEntity } from './entity/user.entity';
const Joi = BaseJoi.extend(JoiDate);

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum UserStatus {
    WAITING_FOR_APPROVAL = 'waiting_for_approval',
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}

export const userFields = {
    fullName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.fullName'),
    phoneNumber: Joi.string()
        .allow(null)
        .regex(RegExp(PHONE_NUMBER_REGEX))
        .max(INPUT_PHONE_MAX_LENGTH)
        .optional()
        .label('user.fields.phoneNumber'),
    birthday: Joi.date()
        .allow(null)
        .format('YYYY-MM-DD')
        .min(BIRTHDAY_MIN_DATE)
        .less('now')
        .optional()
        .label('user.fields.birthday'),
    gender: Joi.string()
        .allow(null)
        .valid(UserGender.FEMALE, UserGender.MALE, UserGender.OTHER)
        .optional()
        .label('user.fields.gender'),
    roleId: Joi.number().required().label('user.fields.role'),
    email: Joi.string()
        .regex(EMAIL_REGEX)
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.email'),
    password: Joi.string()
        .allow(null)
        .min(8)
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .label('user.fields.password'),
};

export const AllowUpdateStatus = {
    [UserStatus.WAITING_FOR_APPROVAL]: [UserStatus.ACTIVE, UserStatus.INACTIVE],
    [UserStatus.ACTIVE]: [UserStatus.INACTIVE],
    [UserStatus.INACTIVE]: [UserStatus.ACTIVE],
};

export const excel = ['xls', 'xlsx', 'csv'];

export const userListAttributes = [
    'users.id',
    'users.fullName',
    'users.email',
    'users.phoneNumber',
    'users.birthday',
    'users.gender',
    'users.role',
    'users.createdAt',
    'users.status',
];

export const userDetailAttributes: (keyof UserEntity)[] = [
    'id',
    'email',
    'fullName',
    'phoneNumber',
    'birthday',
    'gender',
    'status',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
