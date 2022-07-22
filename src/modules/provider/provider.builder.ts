import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';

export class ProviderQueryBuilder extends BaseQueryBuilder<ProviderEntity> {
    constructor(queryBuilder: QueryBuilder<ProviderEntity>) {
        super(queryBuilder);
    }
}
