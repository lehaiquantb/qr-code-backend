import { BaseRepository } from '~common';
import { EntityRepository, FindConditions } from 'typeorm';
import { RoleEntity } from '~role/entity/role.entity';
import { RoleQueryBuilder } from './role.builder';

@EntityRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> {
    builder(alias: string): RoleQueryBuilder {
        return new RoleQueryBuilder(this.createQueryBuilder(alias));
    }

    getDetailByFindCondition(
        findCondition: FindConditions<RoleEntity>,
    ): Promise<RoleEntity> {
        return this.findOne(findCondition);
    }

    constructor() {
        super();
    }
}
