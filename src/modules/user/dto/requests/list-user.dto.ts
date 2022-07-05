import { INPUT_TEXT_MAX_LENGTH } from '~common';

import { UserGender, UserStatus } from '../../user.constant';
import { ORDER_DIRECTION } from 'src/common/constants/common.constants';
import * as Joi from 'joi';

export const UserListQueryStringSchema = Joi.object().keys({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    orderBy: Joi.string().optional(),
    orderDirection: Joi.string()
        .valid(ORDER_DIRECTION.ASC, ORDER_DIRECTION.DESC)
        .optional(),
    genders: Joi.array()
        .items(
            Joi.string().valid(
                UserGender.FEMALE,
                UserGender.MALE,
                UserGender.OTHER,
            ),
        )
        .optional(),
    statuses: Joi.array()
        .items(
            Joi.string().valid(
                UserStatus.ACTIVE,
                UserStatus.INACTIVE,
                UserStatus.WAITING_FOR_APPROVAL,
            ),
        )
        .optional(),
    roles: Joi.array().items(Joi.number().optional()).optional(),
});
export class UserListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    genders?: UserGender[];
    statuses?: UserStatus[];
    roles?: number[];
}
