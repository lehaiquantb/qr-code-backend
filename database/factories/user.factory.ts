import { faker } from '@faker-js/faker';
import { UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';

const userFactory: FactoryDefine<UserEntity> = async () => {
    const user = new UserEntity();
    user.fullName = 'Le Hai Quan';
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.status = UserStatus.ACTIVE;

    // const userToken = new UserTokenEntity();
    // await repo.insert(user);
    // userToken.user = user;
    // userToken.hashToken = faker.internet.password();
    // userToken.type = UserTokenType.REFRESH_TOKEN;
    // userToken.token = faker.internet.password();
    // await repoUserToken.insert(userToken);
    return user;
};

export default userFactory;
