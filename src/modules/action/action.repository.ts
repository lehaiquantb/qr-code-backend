import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { ActionEntity } from '~action/entity/action.entity';
import { ActionQueryBuilder } from '~action/action.builder';

@EntityRepository(ActionEntity)
export class ActionRepository extends BaseRepository<ActionEntity> {
    builder(alias: string): ActionQueryBuilder {
        return new ActionQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
