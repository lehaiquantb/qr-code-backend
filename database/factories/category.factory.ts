import { faker } from '@faker-js/faker';
import { CategoryEntity } from '~category/entity/category.entity';
import { FactoryDefine } from '.';

const categoryFactory: FactoryDefine<CategoryEntity> = async () => {
    const category = new CategoryEntity();
    category.name = faker.commerce.product();
    category.description = faker.commerce.productDescription();
    return category;
};

export default categoryFactory;
