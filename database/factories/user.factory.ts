import { UserEntity } from 'src/modules/user/entity/user.entity';
import {define} from 'typeorm-seeding';
import{ Faker} from 'typeorm-seeding/node_modules/@faker-js/faker';

define(UserEntity, (faker:  Faker) => {
    const gender = faker.random.numeric(1)
    const firstName = faker.name.firstName('female')
    const lastName = faker.name.lastName('male')
   
    const user = new UserEntity()
    user.email = 'asda@gmail.com'
    user.password = '1212131312'
    user.fullName = firstName
    return user
  })
   