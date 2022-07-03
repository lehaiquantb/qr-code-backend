import { CategoryEntity } from '~category/entity/category.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, Params } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
dotenv.config();

export let categoryList: Params<CategoryEntity>[] = [
    {
        name: 'Rau củ',
        description: 'Nông sản sạch',
    },
    {
        name: 'Thực phẩm tươi sống',
        description: 'Đồ tươi sống',
    },
    {
        name: 'Thực phẩm khô',
        description: 'Đồ khô được bảo quản tốt',
    },
    {
        name: 'Bách hóa',
        description: 'Các sản phẩm thiết yếu cho tiêu dùng',
    },
    {
        name: 'Gia dụng',
        description: 'Các sản phẩm gia dụng',
    },
];

export class Category_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = categoryList.map((item) =>
            factoryExcute(CategoryEntity, item),
        );
        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.CATEGORY).clear()
    }
}
