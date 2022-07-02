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
        const categoryEntities: CategoryEntity[] = [];

        return new CategoryListResponseDto(categoryEntities);
    }
}
