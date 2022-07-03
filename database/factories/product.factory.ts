import { CategoryEntity } from '~category/entity/category.entity';
import { factoryExcute } from '~database/factories';
import { faker } from '@faker-js/faker';
import { ProductEntity } from '~product/entity/product.entity';
import { FactoryDefine } from '.';
import { FileEntity } from '~file/entity/file.entity';

const productFactory: FactoryDefine<ProductEntity> = async (params) => {
    const product = new ProductEntity();
    product.image = params?.image ?? (await factoryExcute(FileEntity));
    product.category =
        params?.category ?? (await factoryExcute(CategoryEntity));
    product.qrCode = `89${faker.datatype.number({
        min: 10000000000,
        max: 99999999999,
    })}`;
    product.price = faker.datatype.number({ min: 1000, max: 999000 });
    product.name = faker.commerce.productName();
    product.description = faker.commerce.productDescription();
    product.verified = false;
    return product;
};

export default productFactory;
