
import { faker } from '@faker-js/faker';
import { RateEntity } from '~rate/entity/rate.entity';
import { FactoryDefine } from '.';

const rateFactory: FactoryDefine<RateEntity> = async () => {
    const rate = new RateEntity();
    return rate;
};

export default rateFactory;
