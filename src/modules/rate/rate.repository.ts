import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { RateEntity } from '~rate/entity/rate.entity';
import { RateQueryBuilder } from '~rate/rate.builder';

@EntityRepository(RateEntity)
export class RateRepository extends BaseRepository<RateEntity> {
    builder(alias: string): RateQueryBuilder {
        return new RateQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
