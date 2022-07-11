import { QueryListActionDto } from '~action/dto/request/action.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { ActionEntity } from '~action/entity/action.entity';
import { ActionRepository } from '~action/action.repository';
import { ActionListResponseDto } from '~action/dto/response/action.response.dto';

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
        const actionEntities: ActionEntity[] = [];

        return new ActionListResponseDto(actionEntities);
    }
}
