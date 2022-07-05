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

        queryBuilder.orderBy(queryParam.orderBy, queryParam.orderDirection);

        // const total = await queryBuilder.getCount();
        const items = await queryBuilder
            .greater(queryParam.orderBy as any, queryParam.lastOrderValue)
            .limit(queryParam.limit)
            .getMany();
        console.log(queryBuilder.getSql());

        return new ProductListResponseDto(items, {
            lastOrderByValue: _.last(items)?.[queryParam.orderBy],
            total: 0,
            limit: queryParam.limit,
        });
    }
}
