import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { RoleEntity } from './entity/role.entity';

export class RoleQueryBuilder extends BaseQueryBuilder<RoleEntity> {
    constructor(queryBuilder: QueryBuilder<RoleEntity>) {
        super(queryBuilder);
    }
}
