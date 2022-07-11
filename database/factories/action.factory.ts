import { faker } from '@faker-js/faker';
import { ActionEntity } from '~action/entity/action.entity';
import { ProductEntity } from '~product/entity/product.entity';
import { UserEntity } from '~user/entity/user.entity';
import { FactoryDefine, factoryExcute } from '.';

const actionFactory: FactoryDefine<ActionEntity> = async (params) => {
    const action = new ActionEntity();
    action.user = params?.user ?? (await factoryExcute(UserEntity));
    action.product = params?.product ?? (await factoryExcute(ProductEntity));
    action.comment = faker.lorem.sentence();
    action.rate = faker.datatype.number({ min: 1, max: 5 });
    action.isFavorite = faker.datatype.boolean();
    return action;
};

export default actionFactory;
