import { faker } from '@faker-js/faker';
import { UserTokenType } from '../../src/modules/auth/auth.constant';
import { UserTokenEntity } from '../../src/modules/auth/entity/user-token.entity';
import { UserStatus } from '../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { factoryExcute, FactoryDefine } from '.';

const userTokenFactory: FactoryDefine<UserTokenEntity> = async () => {
    const entity = new UserTokenEntity();

    entity.user = await factoryExcute(UserEntity);
    entity.hashToken = faker.internet.password();
    entity.type = UserTokenType.REFRESH_TOKEN;
    entity.token = faker.internet.password();
    return entity;

}

export default userTokenFactory;