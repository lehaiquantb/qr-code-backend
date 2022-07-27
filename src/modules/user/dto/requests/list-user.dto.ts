import {
    JoiArray,
    JoiOptional,
    Limit,
    OrderBy,
    OrderDirection,
    Page,
    QueryParamDto,
    SearchKeyword,
} from '~common';

import { UserGender, UserStatus } from '../../user.constant';
import { ORDER_DIRECTION } from 'src/common/constants/common.constants';
import * as Joi from 'joi';

export class UserListQueryStringDto extends QueryParamDto {
    @Page()
    page: number;

    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @OrderBy()
    orderBy: string;

    @OrderDirection()
    orderDirection: ORDER_DIRECTION;

    @JoiArray(UserGender, Joi.array().default(Object.values(UserGender)))
    @JoiOptional()
    genders: UserGender[];

    @JoiArray(UserStatus, Joi.array().default(Object.values(UserStatus)))
    statuses?: UserStatus[];
}
