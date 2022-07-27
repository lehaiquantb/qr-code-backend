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
        console.log(queryParam);

        if (queryParam.categoryIds.length > 0) {
            queryBuilder.whereCategoryIdIn(queryParam.categoryIds);
        }

        queryBuilder
            .orderByColumn(queryParam.orderBy, queryParam.orderDirection)
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.image', 'image')
            .leftJoin(
                'product.actions',
                'actions',
                'actions.productId = product.id',
            )
            .groupBy('product.id')
            .addSelect('AVG(actions.rate)', 'averageRate');

        const total = await queryBuilder.getCount();
        const items = await queryBuilder
            .greaterThan(queryParam.orderBy, queryParam.lastOrderValue)
            .limit(queryParam.limit)
            .getManyEntity();

        return new ProductListResponseDto(items, {
            lastOrderByValue: _.last(items)?.[queryParam.orderBy],
            total,
            limit: queryParam.limit,
        });
    }

    async getProductDetailById(productId: number): Promise<ProductEntity> {
        const product = await this.repository
            .builder('product')
            .whereEqual('id', productId)
            .queryDetail()
            .getOneEntity();
        return product;
    }

    async getProductDetailByQrCode(qrCode: string): Promise<ProductEntity> {
        const product = await this.repository
            .builder('product')
            .whereEqual('qrCode', qrCode)
            .queryDetail()
            .getOneEntity();

        return product;
    }
}
