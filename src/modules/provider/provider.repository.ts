import { EntityRepository, FindConditions } from 'typeorm';
import { BaseRepository } from '~common';
import { FileEntity } from '~file/entity/file.entity';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderQueryBuilder } from '~provider/provider.builder';
import { UserEntity } from '~user/entity/user.entity';

@EntityRepository(ProviderEntity)
export class ProviderRepository extends BaseRepository<ProviderEntity> {
    async getDetailByFindCondition(
        findCondition: FindConditions<ProviderEntity>,
    ): Promise<ProviderEntity> {
        const provider = await this.builder('provider')
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
            .where(findCondition)
            .getOneEntity();
        console.log(provider);

        return provider;
    }
    async getDetailById(id: number): Promise<ProviderEntity> {
        const provider = await this.builder('provider')
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
            .whereEqual('id', id)
            .getOneEntity();

        return provider;
    }

    builder(alias: string): ProviderQueryBuilder {
        return new ProviderQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
