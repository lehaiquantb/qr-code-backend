import { TABLE_NAME } from '~database/constant';
import { Entity } from 'typeorm';
import { BaseEntity } from '~common';
import { CategoryQueryBuilder } from '~category/category.builder';

const NAME = TABLE_NAME.CATEGORY;
@Entity({ name: NAME })
export class CategoryEntity extends BaseEntity {
    static builder(alias: string) {
        return new CategoryQueryBuilder(
            CategoryEntity.createQueryBuilder(alias),
        );
    }
}
