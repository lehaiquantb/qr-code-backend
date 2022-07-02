import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';
import { CategoryQueryBuilder } from '~category/category.builder';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
    builder(alias: string): CategoryQueryBuilder {
        return new CategoryQueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
