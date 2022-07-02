import { faker } from '@faker-js/faker';
import { ProductEntity } from '~product/entity/product.entity';
import { FactoryDefine } from '.';

const productFactory: FactoryDefine<ProductEntity> = async () => {
    const product = new ProductEntity();
    return product;
};

export default productFactory;
