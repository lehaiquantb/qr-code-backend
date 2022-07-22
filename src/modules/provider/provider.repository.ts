import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderQueryBuilder } from '~provider/provider.builder';

@EntityRepository(ProviderEntity)
export class ProviderRepository extends BaseRepository<ProviderEntity> {
    builder(alias: string): ProviderQueryBuilder {
        return new ProviderQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
