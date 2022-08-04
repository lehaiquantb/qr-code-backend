import {
    JoiArray,
    Limit,
    OrderBy,
    OrderDirection,
    ORDER_DIRECTION,
    Page,
    QueryParamDto,
    RequestBodyDto,
    SearchKeyword,
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
    JoiEnum,
    JoiOptional,
    JoiRequired,
    Id,
} from '~common';
import { Joi } from '~plugins';
import { ProviderStatus } from '~provider/provider.constant';
export const ProviderSchema = {
    id: Joi.number(),
};

export class CreateProviderDto extends RequestBodyDto {
    @JoiRequired(Joi.string().max(INPUT_TEXT_MAX_LENGTH))
    name: string;

    @JoiRequired(Joi.string().max(TEXTAREA_MAX_LENGTH))
    address: string;

    @JoiRequired(Joi.string().max(TEXTAREA_MAX_LENGTH))
    description: string;

    @JoiEnum(ProviderStatus)
    status: ProviderStatus;

    @JoiOptional()
    @Id()
    licenseImageId?: number;

    @JoiRequired()
    @Id()
    ownerId?: number;
}

export class QueryProviderDto extends QueryParamDto {}

export class QueryListProviderDto extends QueryParamDto {
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

    @JoiArray(
        ProviderStatus,
        Joi.array().default(Object.values(ProviderStatus)),
    )
    statuses?: ProviderStatus[];

    @JoiArray(Joi.number(), Joi.array().default([]))
    @JoiOptional()
    ownerIds?: number[];
}

export class UpdateProviderDto extends CreateProviderDto {}
