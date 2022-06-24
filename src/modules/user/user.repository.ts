import { UserEntity } from '~user/entity/user.entity';
import { BaseRepository } from '~common';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    constructor() {
        super();
        // this.createQueryBuilder('user').leftJoin()
    }
}
