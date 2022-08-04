import { QueryListProviderDto } from '~provider/dto/request/provider.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest, BadRequestException } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderRepository } from '~provider/provider.repository';
import { ProviderListResponseDto } from '~provider/dto/response/provider.response.dto';
import { UserEntity } from '~user/entity/user.entity';
import { FileEntity } from '~file/entity/file.entity';
import { UserRepository } from '~user/user.repository';
import { FileRepository } from '~file/file.repository';

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
        private readonly userRepository: UserRepository,
        private readonly fileRepository: FileRepository,
    ) {
        super(providerRepository);
    }

    async queryProviderList(
        queryParam: QueryListProviderDto,
    ): Promise<ProviderListResponseDto> {
        const qb = this.repository
            .builder('provider')
            .leftJoinAndMapOne(
                'provider.owner',
                UserEntity,
                'user',
                'user.id = provider.ownerId',
            )
            .leftJoinAndMapOne(
                'provider.licenseImage',
                FileEntity,
                'file',
                'file.id = provider.licenseImageId',
            )
            .search(['name', 'description'], queryParam.keyword)
            .orderByColumn(queryParam.orderBy, queryParam.orderDirection)
            .whereIn('status', queryParam.statuses);

        if (queryParam.ownerIds.length > 0) {
            qb.whereIn('ownerId', queryParam.ownerIds);
        }

        qb.pagination(queryParam.page, queryParam.limit);

        const [items, totalItems] = await qb.getManyAndCount();
        const res = new ProviderListResponseDto(items);
        res.meta = {
            total: totalItems,
            limit: queryParam?.limit,
        };
        return res;
    }

    async checkImageAndOwnerExist(
        imageId?: number,
        ownerId?: number,
    ): Promise<boolean> {
        if (ownerId) {
            const ownerExist = await this.userRepository.isExist({
                id: ownerId,
            });
            if (!ownerExist) {
                throw new BadRequestException('provider.error.ownerNotExist');
            }
        }

        if (imageId) {
            const fileExist = await this.fileRepository.isExist({
                id: imageId,
            });
            if (!fileExist) {
                throw new BadRequestException('provider.error.licenseNotExist');
            }
        }
        return true;
    }
}
