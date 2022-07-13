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
    AuthUser,
    IAuthUser,
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
} from '~product/dto/request/product.request.dto';
import { ActionResponseDto } from '~action/dto/response/action.response.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController extends BaseController {
    constructor(
        private readonly productService: ProductService,
        private readonly databaseService: DatabaseService,
        private readonly productRepository: ProductRepository,
    ) {
        super();
    }

    @Get(':id')
    async getProductById(
        @Param('id', ParseIntPipe) id: number,
        @AuthUser() authUser?: IAuthUser,
    ) {
        try {
            const product = await this.productService.getProductDetailById(id);

            if (!product) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'product.error.notFound',
                );
            }

            const response = new ProductResponseDto(product);
            response.currentActionOfUser = new ActionResponseDto(
                product?.actions?.find((a) => a.userId === authUser?.id),
            );
            return new SuccessResponse(response);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('scan/:qrCode')
    async scanProductByQrCode(
        @Param('qrCode') qrCode: string,
        @AuthUser() authUser?: IAuthUser,
    ) {
        try {
            const product = await this.productService.getProductDetailByQrCode(
                qrCode,
            );

            if (!product) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'product.error.notFound',
                );
            }

            const response = new ProductResponseDto(product);
            response.currentActionOfUser = new ActionResponseDto(
                product?.actions?.find((a) => a.userId === authUser?.id),
            );
            return new SuccessResponse(response);
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
                await this.productService.queryProductList(query);
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
                    'product.error.exist',
                );
            }

            const insertedProduct =
                await this.productService.repository.insertAndGet(data);

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
            if (!productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.error.notExist',
                );
            }

            const updatedProduct = await this.productService.update(id, data);

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
            if (!productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.error.notExist',
                );
            }

            const deleteResult = await this.productService.softDelete(id);

            return new SuccessResponse({ id }, 'product.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
