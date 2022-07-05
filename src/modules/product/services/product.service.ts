import { QueryListProductDto } from '~product/dto/request/product.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { ProductEntity } from '~product/entity/product.entity';
import { ProductRepository } from '~product/product.repository';
import { ProductListResponseDto } from '~product/dto/response/product.response.dto';
import _ from 'lodash';
import { CategoryEntity } from '~category/entity/category.entity';
import { FileEntity } from '~file/entity/file.entity';

@Injectable()
export class ProductService extends BaseService<
    ProductEntity,
    ProductRepository
> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly productRepository: ProductRepository,
    ) {
        super(productRepository);
    }

    async queryProductList(
        queryParam: QueryListProductDto,
    ): Promise<ProductListResponseDto> {
        const productEntities: ProductEntity[] = [];

        const queryBuilder = this.repository
            .builder('product')
            .search(['name', 'description'], queryParam.keyword);
        if (queryParam.categoryIds.length > 0) {
            queryBuilder.whereCategoryIdIn(queryParam.categoryIds);
        }

        queryBuilder
            .orderByColumn(queryParam.orderBy, queryParam.orderDirection)
            .leftJoinAndMapOne(
                'product.category',
                CategoryEntity,
                'category',
                'category.id = product.categoryId',
            )
            .leftJoinAndMapOne(
                'product.image',
                FileEntity,
                'image',
                'image.id = product.imageId',
            )
            .leftJoin('product.rates', 'rates')
            .groupBy('product.id')
            .selectColumns([{ alias: 'product', columns: 'id' }])
            .addSelect('AVG(rates.rate)', 'averageRate');
        console.log(queryBuilder.getQuery().bgBlue);

        const total = await queryBuilder.getCount();
        const items = await queryBuilder
            .greaterThan(queryParam.orderBy, queryParam.lastOrderValue)
            .limit(queryParam.limit)
            .getMany();

        console.log(items);

        return new ProductListResponseDto(items, {
            lastOrderByValue: _.last(items)?.[queryParam.orderBy],
            total,
            limit: queryParam.limit,
        });
    }
}
