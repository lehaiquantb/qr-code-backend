import {
    QueryListLazyLoadProductDto,
    QueryListProductDto,
} from '~product/dto/request/product.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BadRequestException, BaseService, IRequest } from '~common';
import { ProductEntity } from '~product/entity/product.entity';
import { ProductRepository } from '~product/product.repository';
import { ProductListResponseDto } from '~product/dto/response/product.response.dto';
import _ from 'lodash';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { CategoryService } from '~category/services/category.service';
import { FileService } from '~file/services/file.service';

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
        private readonly categoryService: CategoryService,
        private readonly fileService: FileService,
    ) {
        super(productRepository);
    }

    async queryProductList(
        queryParam: QueryListProductDto,
    ): Promise<ProductListResponseDto> {
        const queryBuilder = this.repository
            .builder('product')
            .search(['name', 'description'], queryParam.keyword);

        if (queryParam.categoryIds.length > 0) {
            queryBuilder.whereCategoryIdIn(queryParam.categoryIds);
        }

        if (queryParam.providerIds.length > 0) {
            queryBuilder.whereIn('providerId', queryParam.providerIds);
        }

        queryBuilder
            .orderByColumn(queryParam.orderBy, queryParam.orderDirection)
            .leftJoinAndMapOne(
                'product.provider',
                ProviderEntity,
                'provider',
                'provider.id = product.providerId',
            )
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
            .pagination(queryParam.page, queryParam.limit)
            .getManyEntity();

        return new ProductListResponseDto(items, {
            total,
            limit: queryParam.limit,
        });
    }

    async queryProductListLazyLoad(
        queryParam: QueryListLazyLoadProductDto,
    ): Promise<ProductListResponseDto> {
        const queryBuilder = this.repository
            .builder('product')
            .search(['name', 'description'], queryParam.keyword);

        if (queryParam.categoryIds.length > 0) {
            queryBuilder.whereCategoryIdIn(queryParam.categoryIds);
        }

        queryBuilder
            .orderByColumn('id', 'DESC')
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
            .lessThan('id', queryParam.lastOrderId)
            .limit(queryParam.limit)
            .getManyEntity();

        return new ProductListResponseDto(items, {
            lastOrderId: _.last(items)?.id,
            total,
            limit: queryParam.limit,
        });
    }

    async getProductDetailById(productId: number): Promise<ProductEntity> {
        const product = await this.repository.getDetailByFindCondition({
            id: productId,
        });
        return product;
    }

    async getProductDetailByQrCode(qrCode: string): Promise<ProductEntity> {
        const product = await this.repository.getDetailByFindCondition({
            qrCode,
        });

        return product;
    }

    async checkCategoryAndImageExist(categoryId?: number, imageId?: number) {
        if (categoryId) {
            const categoryExist = await this.categoryService.repository.isExist(
                {
                    id: categoryId,
                },
            );
            if (!categoryExist) {
                throw new BadRequestException('category.error.notExist');
            }
        }

        if (imageId) {
            const fileExist = await this.fileService.repository.isExist({
                id: imageId,
            });
            if (!fileExist) {
                throw new BadRequestException('file.error.notExist');
            }
        }
    }
}
