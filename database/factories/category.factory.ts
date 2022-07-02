
import { faker } from '@faker-js/faker';
import { CategoryEntity } from '~category/entity/category.entity';
import { FactoryDefine } from '.';

const categoryFactory: FactoryDefine<CategoryEntity> = async () => {
    const category = new CategoryEntity();
    return category;
};

export default categoryFactory;
