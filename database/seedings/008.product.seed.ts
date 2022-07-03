import { categoryList } from './007.category.seed';
import { ProductEntity } from '~product/entity/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, Params } from '~database/factories';
import { CategoryEntity } from '~category/entity/category.entity';
import { TABLE_NAME } from '~database/constant';
dotenv.config();

export let productList: Params<ProductEntity>[] = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        qrCode: '89123456789',
        verified: false,
    },
];

export class Product_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = productList.map(async (item) =>
            factoryExcute(ProductEntity, {
                ...item,
                category: await factoryExcute(CategoryEntity, categoryList[0]),
            }),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.PRODUCT).clear()
    }
}
