import { QueryListRateDto } from '~rate/dto/request/rate.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { RateEntity } from '~rate/entity/rate.entity';
import { RateRepository } from '~rate/rate.repository';
import { RateListResponseDto } from '~rate/dto/response/rate.response.dto';

@Injectable()
export class RateService extends BaseService<RateEntity, RateRepository> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly rateRepository: RateRepository,
    ) {
        super(rateRepository);
    }

    async queryRateList(
        queryParam: QueryListRateDto,
    ): Promise<RateListResponseDto> {
        const rateEntities: RateEntity[] = [];

        return new RateListResponseDto(rateEntities);
    }
}
