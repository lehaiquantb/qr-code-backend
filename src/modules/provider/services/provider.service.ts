import { QueryListProviderDto } from '~provider/dto/request/provider.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderRepository } from '~provider/provider.repository';
import { ProviderListResponseDto } from '~provider/dto/response/provider.response.dto';

@Injectable()
export class ProviderService extends BaseService<
    ProviderEntity,
    ProviderRepository
> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly providerRepository: ProviderRepository,
    ) {
        super(providerRepository);
    }

    async queryProviderList(
        queryParam: QueryListProviderDto,
    ): Promise<ProviderListResponseDto> {
        const providerEntities: ProviderEntity[] = [];

        return new ProviderListResponseDto(providerEntities);
    }
}
