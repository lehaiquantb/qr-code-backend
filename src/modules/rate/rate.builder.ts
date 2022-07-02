import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { RateEntity } from '~rate/entity/rate.entity';

export class RateQueryBuilder extends BaseQueryBuilder<RateEntity> {
    constructor(queryBuilder: QueryBuilder<RateEntity>) {
        super(queryBuilder);
    }
}
