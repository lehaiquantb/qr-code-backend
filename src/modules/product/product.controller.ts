import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    Request,
} from '@nestjs/common';

import {
    HttpStatus,
    BaseController,
    ErrorResponse,
    SuccessResponse,
    DatabaseService,
    IRequest,
} from '~common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '~product/services/product.service';

import {
    ProductResponseDto,
    ProductListResponseDto,
} from '~product/dto/response/product.response.dto';
import { ProductRepository } from '~product/product.repository';
import {
    QueryListProductDto,
    CreateProductDto,
    UpdateProductDto,
} from '~product/dto/request/user.request.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController extends BaseController {
    constructor(
        private readonly productsService: ProductService,
        private readonly databaseService: DatabaseService,
        private readonly productRepository: ProductRepository,
    ) {
        super();
    }

    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number) {
        try {
            const product = await this.productsService.findById(id);
            if (!product) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'product.common.error.product.notFound',
                );
            }
            return new SuccessResponse(new ProductResponseDto(product));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getProductList(
        @Query()
        query: QueryListProductDto,
    ) {
        try {
            const productList: ProductListResponseDto =
                await this.productsService.queryProductList(query);
            return new SuccessResponse(productList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async createProduct(
        @Request() req: IRequest,
        @Body() data: CreateProductDto,
    ) {
        try {
            const productExist = await this.productRepository.isExist({});
            if (productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.common.error.exist',
                );
            }

            const insertedProduct =
                await this.productsService.repository.insertAndGet(data);

            return new SuccessResponse(new ProductResponseDto(insertedProduct));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateProductDto,
    ) {
        try {
            const productExist = await this.productRepository.isExist({ id });
            if (productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.common.error.exist',
                );
            }

            const updatedProduct = await this.productsService.update(id, data);

            return new SuccessResponse(new ProductResponseDto(updatedProduct));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async deleteProduct(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const productExist = await this.productRepository.isExist({ id });
            if (productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.common.error.exist',
                );
            }

            const deleteResult = await this.productsService.softDelete(id);

            return new SuccessResponse({ id }, 'product.delete.success');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}