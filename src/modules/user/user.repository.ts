import { UserEntity } from '~user/entity/user.entity';
import { BaseRepository } from '~common';
import { EntityRepository } from 'typeorm';
import { UserQueryBuilder } from './user.builder';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    builder(alias: string): UserQueryBuilder {
        return new UserQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
        // this.createQueryBuilder('user').leftJoin()
    }
}
