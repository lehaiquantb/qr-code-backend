import { QueryListCategoryDto } from '~category/dto/request/category.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';
import { CategoryRepository } from '~category/category.repository';
import { CategoryListResponseDto } from '~category/dto/response/category.response.dto';

@Injectable()
export class CategoryService extends BaseService<
    CategoryEntity,
    CategoryRepository
> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly categoryRepository: CategoryRepository,
    ) {
        super(categoryRepository);
    }

    async queryCategoryList(
        queryParam: QueryListCategoryDto,
    ): Promise<CategoryListResponseDto> {
        const qb = this.repository
            .builder('category')
            .search(['name', 'description'], queryParam.keyword)
            .orderByColumn(queryParam.orderBy, queryParam.orderDirection)
            .pagination(queryParam.page, queryParam.limit);

        const [items, totalItems] = await qb.getManyAndCount();
        const res = new CategoryListResponseDto(items);
        res.meta = {
            total: totalItems,
            limit: queryParam?.limit,
        };
        return res;
    }
}
