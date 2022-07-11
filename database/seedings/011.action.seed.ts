import { ActionEntity } from '~action/entity/action.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, ParamsExtend } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
import { ProductEntity } from '~product/entity/product.entity';
import { UserEntity } from '~user/entity/user.entity';

dotenv.config();

export let actionList: ParamsExtend<ActionEntity>[] = [
    {
        id: 1,
        rate: 5,
        comment: 'Nước uống phù hợp trong những ngày hè nóng nực',
        product: () => factoryExcute(ProductEntity, { id: 1 }),
        user: () => factoryExcute(UserEntity, { id: 2 }),
        isFavorite: true,
    },
    {
        id: 2,
        rate: 3,
        comment: 'Không ngon bằng coca-cola',
        product: () => factoryExcute(ProductEntity, { id: 1 }),
        user: () => factoryExcute(UserEntity, { id: 4 }),
        isFavorite: true,
    },
    {
        id: 3,
        rate: 1,
        comment: 'Uống nhiều không tốt',
        product: () => factoryExcute(ProductEntity, { id: 1 }),
        user: () => factoryExcute(UserEntity, { id: 3 }),
        isFavorite: false,
    },
    {
        id: 4,
        rate: 5,
        comment: 'Nhà mình dùng thường xuyên thấy tốt',
        product: () => factoryExcute(ProductEntity, { id: 2 }),
        user: () => factoryExcute(UserEntity, { id: 3 }),
        isFavorite: false,
    },
];

export class Action_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = actionList.map(async (item) =>
            factoryExcute(ActionEntity, {
                ...item,
            }),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.ACTION).clear();
    }
}
