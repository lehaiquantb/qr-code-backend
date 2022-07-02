import { TABLE_NAME } from '~database/constant';
import { Entity } from 'typeorm';
import { BaseEntity } from '~common';
import { RateQueryBuilder } from '~rate/rate.builder';

const NAME = TABLE_NAME.RATE;
@Entity({ name: NAME })
export class RateEntity extends BaseEntity {
    static builder(alias: string) {
        return new RateQueryBuilder(RateEntity.createQueryBuilder(alias));
    }
}
