import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(UserEntity)().createMany(1);
    }
}
