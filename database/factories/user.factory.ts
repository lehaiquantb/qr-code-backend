import { faker, Gender } from '@faker-js/faker';
import { UserGender, UserStatus } from './../../src/modules/user/user.constant';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { FactoryDefine } from '.';
import { randomEnum } from '~common';

const userFactory: FactoryDefine<UserEntity> = async () => {
    const user = new UserEntity();
    user.fullName = faker.name.firstName() + ' ' + faker.name.lastName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.status = UserStatus.ACTIVE;
    user.gender = randomEnum(UserGender);
    user.birthday = faker.date.birthdate();
    return user;
};

export default userFactory;
