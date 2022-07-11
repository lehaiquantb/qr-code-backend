import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { ActionEntity } from '~action/entity/action.entity';

export class ActionQueryBuilder extends BaseQueryBuilder<ActionEntity> {
    constructor(queryBuilder: QueryBuilder<ActionEntity>) {
        super(queryBuilder);
    }
}
