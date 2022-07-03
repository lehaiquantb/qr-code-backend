import { UserEntity } from '~user/entity/user.entity';
import { factoryExcute } from '~database/factories';

import { faker } from '@faker-js/faker';
import { RateEntity } from '~rate/entity/rate.entity';
import { FactoryDefine } from '.';
import { ProductEntity } from '~product/entity/product.entity';

const rateFactory: FactoryDefine<RateEntity> = async (params) => {
    const rate = new RateEntity();
    rate.user = params?.user ?? await factoryExcute(UserEntity);
    rate.product = params?.product ?? await factoryExcute(ProductEntity);
    rate.comment = faker.lorem.sentence();
    rate.rate = faker.datatype.number({ min: 1, max: 5 });

    return rate;
};

export default rateFactory;
