import { QueryListActionDto } from '~action/dto/request/action.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { ActionEntity } from '~action/entity/action.entity';
import { ActionRepository } from '~action/action.repository';
import { ActionListResponseDto } from '~action/dto/response/action.response.dto';
import _ from 'lodash';

@Injectable()
export class ActionService extends BaseService<ActionEntity, ActionRepository> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly actionRepository: ActionRepository,
    ) {
        super(actionRepository);
    }

    async queryActionList(
        queryParam: QueryListActionDto,
    ): Promise<ActionListResponseDto> {
        const builder = this.repository
            .builder('action')
            .whereEqual('productId', queryParam.productId);

        const total = await builder.getCount();

        builder
            .orderByColumn('id', 'ASC')
            .greaterThan('id', queryParam.lastActionId)
            .limit(queryParam.limit);
        const actionEntities: ActionEntity[] = await builder.getManyEntity();

        const res = new ActionListResponseDto(actionEntities);
        res.meta = {
            total,
            limit: queryParam.limit,
            lastOrderByValue: `${_.last(actionEntities)?.id}`,
        };
        return res;
    }
}
