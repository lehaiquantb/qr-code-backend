import { QueryListProductDto } from '~product/dto/request/product.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { ProductEntity } from '~product/entity/product.entity';
import { ProductRepository } from '~product/product.repository';
import { ProductListResponseDto } from '~product/dto/response/product.response.dto';

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

        return new ProductListResponseDto(productEntities);
    }
}
