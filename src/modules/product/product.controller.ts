import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    UnauthorizedException,
} from '@nestjs/common';

import {
    HttpStatus,
    BaseController,
    ErrorResponse,
    SuccessResponse,
    AuthUser,
    IAuthUser,
    Auth,
    userIsAdministrator,
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
        private readonly productRepository: ProductRepository,
    ) {
        super();
    }

    // api for app load list product
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

    @Get('/owner')
    @Auth(['readAll_product'])
    async getProductListOwner(
        @Query()
        query: QueryListOwnerProductDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            // check if user own provider
            const providerId = query.providerIds?.[0];
            let providerIds = [];

            if (providerId) {
                providerIds = [providerId];
                const isOwner = await this.providerService.repository.isExist({
                    id: providerId,
                    ownerId: authUser.id,
                    // status: ProviderStatus.ACCEPT,
                });

                if (!isOwner) {
                    throw new UnauthorizedException();
                }
            } else {
                const providers = await this.providerService.findAll({
                    ownerId: authUser.id,
                    // status: ProviderStatus.ACCEPT,
                });
                providerIds = providers.map((p) => p.id);

                //note

                if (providerIds?.length === 0) {
                    return new SuccessResponse(
                        new ProductListResponseDto([], {
                            total: 0,
                            limit: query.limit,
                        }),
                    );
                }
            }

            const newQuery: QueryListProductDto = {
                ...query,
                providerIds,
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
        @Body() data: CreateProductDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            // generate qrCode
            if (!data?.qrCode) {
                const lastItem =
                    await this.productService.repository.getLastItem();
                data.qrCode = `${8900000000001 + lastItem.id}`;
            }

            const productExist = await this.productRepository.isExist({
                qrCode: data?.qrCode,
            });
            if (productExist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_ALREADY_EXIST,
                    'product.error.dupplicateQrCode',
                );
            }

            await this.productService.checkCategoryAndImageExist(
                data.categoryId,
                data.imageId,
            );

            if (!userIsAdministrator(authUser)) {
                delete data.verified;
            }

            const insertedProduct =
                await this.productService.repository.insertAndGet(data);

            return new SuccessResponse(new ProductResponseDto(insertedProduct));
        } catch (error) {
            this.handleError(error);
        }
    }

    @Patch(':id')
    @Auth(['update_product'])
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateProductDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            const productExist = await this.productRepository.isExist({ id });
            if (!productExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'product.error.notExist',
                );
            }

            await this.productService.checkCategoryAndImageExist(
                data.categoryId,
                data.imageId,
            );

            if (!userIsAdministrator(authUser)) {
                delete data.verified;
            }

            const updatedProduct =
                await this.productService.repository.updateAndGet({ id }, data);

            return new SuccessResponse(new ProductResponseDto(updatedProduct));
        } catch (error) {
            this.handleError(error);
        }
    }

    // @Delete(':id')
    // async deleteProduct(
    //     @Request() req: IRequest,
    //     @Param('id', ParseIntPipe) id: number,
    // ) {
    //     try {
    //         const productExist = await this.productRepository.isExist({ id });
    //         if (!productExist) {
    //             return new ErrorResponse(
    //                 HttpStatus.BAD_REQUEST,
    //                 'product.error.notExist',
    //             );
    //         }

    //         const deleteResult = await this.productService.softDelete(id);

    //         return new SuccessResponse({ id }, 'product.success.delete');
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }
}
