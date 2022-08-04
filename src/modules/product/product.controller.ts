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
    UnauthorizedException,
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
    Auth,
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
    QueryListLazyLoadProductDto,
    QueryListOwnerProductDto,
} from '~product/dto/request/product.request.dto';
import { ActionResponseDto } from '~action/dto/response/action.response.dto';
import { ProviderService } from '~provider/services/provider.service';

@Controller('product')
@ApiTags('Product')
export class ProductController extends BaseController {
    constructor(
        private readonly productService: ProductService,
        private readonly providerService: ProviderService,
        private readonly databaseService: DatabaseService,
        private readonly productRepository: ProductRepository,
    ) {
        super();
    }

    @Get('/lazy')
    async getProductListLazyLoad(
        @Query()
        query: QueryListLazyLoadProductDto,
    ) {
        try {
            const productList: ProductListResponseDto =
                await this.productService.queryProductListLazyLoad(query);
            return new SuccessResponse(productList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/owner/:providerId')
    @Auth()
    async getProductListOwner(
        @Param('providerId', ParseIntPipe) providerId: number,
        @Query()
        query: QueryListOwnerProductDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            // check if user own provider
            const isOwner = await this.providerService.repository.isExist({
                id: providerId,
                ownerId: authUser.id,
            });

            if (!isOwner) {
                throw new UnauthorizedException();
            }

            const newQuery: QueryListProductDto = {
                ...query,
                providerIds: [providerId],
            };
            const productList: ProductListResponseDto =
                await this.productService.queryProductList(newQuery);
            return new SuccessResponse(productList);
        } catch (error) {
            this.handleError(error);
        }
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

    @Get('/scan/:qrCode')
    @Auth([], { isPublic: true })
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
    @Auth(['readAll_product'])
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
    @Auth(['create_product'])
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
    @Auth(['update_product'])
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
