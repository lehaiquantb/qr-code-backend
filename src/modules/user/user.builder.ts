import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~base/query-builder.base';
import { UserEntity } from './entity/user.entity';

export class UserQueryBuilder extends BaseQueryBuilder<UserEntity> {
    constructor(queryBuilder: QueryBuilder<UserEntity>) {
        super(queryBuilder);
    }

    public filterByEmail(email: string) {
        return this.filterByColumn('email', email);
    }
}
