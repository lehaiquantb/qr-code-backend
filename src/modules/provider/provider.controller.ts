import { AuthenticatedUser } from '~common';
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
    Auth,
    AuthUser,
    IAuthUser,
    NotFoundException,
} from '~common';
import { ApiTags } from '@nestjs/swagger';
import { ProviderService } from '~provider/services/provider.service';

import { ProviderResponseDto } from '~provider/dto/response/provider.response.dto';
import { ProviderRepository } from '~provider/provider.repository';
import {
    QueryListProviderDto,
    CreateProviderDto,
    UpdateProviderDto,
    CreateProviderOwnerDto,
    UpdateProviderOwnerDto,
} from '~provider/dto/request/provider.request.dto';
import { FileService } from '~file/services/file.service';

@Controller('provider')
@ApiTags('Provider')
export class ProviderController extends BaseController {
    constructor(
        private readonly providerService: ProviderService,
        private readonly databaseService: DatabaseService,
        private readonly providerRepository: ProviderRepository,
        private readonly fileService: FileService,
    ) {
        super();
    }

    @Get('/owner')
    @Auth()
    async getProviderListWithOwner(
        @Query()
        query: QueryListProviderDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            query.ownerIds = [authUser.id];
            const providerResponse =
                await this.providerService.queryProviderList(query);
            return new SuccessResponse(providerResponse);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('owner/:id')
    @Auth()
    async getProviderOwner(
        @Param('id', ParseIntPipe) id: number,
        @AuthUser() authUser: AuthenticatedUser,
    ) {
        try {
            //check owner
            const provider =
                await this.providerService.repository.getDetailByFindCondition({
                    id,
                    ownerId: authUser.id,
                });
            if (!provider) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'provider.error.notFound',
                );
            }
            return new SuccessResponse(new ProviderResponseDto(provider));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Auth(['read_provider'])
    async getProvider(@Param('id', ParseIntPipe) id: number) {
        try {
            const provider =
                await this.providerService.repository.getDetailById(id);
            if (!provider) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'provider.error.notFound',
                );
            }
            return new SuccessResponse(new ProviderResponseDto(provider));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    @Auth(['readAll_provider'])
    async getProviderList(
        @Query()
        query: QueryListProviderDto,
    ) {
        try {
            const providerResponse =
                await this.providerService.queryProviderList(query);
            return new SuccessResponse(providerResponse);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('/owner')
    @Auth()
    async createProviderOwner(
        @Request() req: IRequest,
        @Body() data: CreateProviderOwnerDto,
        @AuthUser() authUser: AuthenticatedUser,
    ) {
        try {
            const licenseImageIdExist = this.fileService.checkExist({
                id: data?.licenseImageId,
            });
            if (!licenseImageIdExist) {
                throw new NotFoundException('file.error.notExist');
            }

            await this.providerService.checkImageAndOwnerExist(
                data.licenseImageId,
            );

            const insertedProvider =
                await this.providerService.repository.insertAndGet({
                    ...data,
                    ownerId: authUser.id,
                });

            if (insertedProvider) {
                return new SuccessResponse(
                    new ProviderResponseDto(insertedProvider),
                );
            } else return new ErrorResponse();
        } catch (error) {
            this.handleError(error);
        }
    }

    @Post()
    @Auth(['create_provider'])
    async createProvider(
        @Request() req: IRequest,
        @Body() data: CreateProviderDto,
        @AuthUser() authUser: AuthenticatedUser,
    ) {
        try {
            const licenseImageIdExist = this.fileService.checkExist({
                id: data?.licenseImageId,
            });
            if (!licenseImageIdExist) {
                throw new NotFoundException('file.error.notExist');
            }

            await this.providerService.checkImageAndOwnerExist(
                data.licenseImageId,
                data.ownerId,
            );

            const insertedProvider =
                await this.providerService.repository.insertAndGet(data);

            if (insertedProvider) {
                return new SuccessResponse(
                    new ProviderResponseDto(insertedProvider),
                );
            } else return new ErrorResponse();
        } catch (error) {
            this.handleError(error);
        }
    }

    @Patch('/owner/:id')
    @Auth()
    async updateProviderOwner(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateProviderOwnerDto,
        @AuthUser() authUser: AuthenticatedUser,
    ) {
        try {
            await this.providerService.checkImageAndOwnerExist(
                data.licenseImageId,
            );

            const providerExist = await this.providerRepository.isExist({ id });
            if (!providerExist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'provider.error.notExist',
                );
            }

            const userOwnProvider = await this.providerService.checkExist({
                id,
                ownerId: authUser.id,
            });
            if (!userOwnProvider) {
                throw new UnauthorizedException();
            }

            const updatedProvider =
                await this.providerService.repository.updateAndGet(
                    { id },
                    { ...data },
                );

            return new SuccessResponse(
                new ProviderResponseDto(updatedProvider),
            );
        } catch (error) {
            this.handleError(error);
        }
    }

    @Patch(':id')
    @Auth(['update_provider'])
    async updateProvider(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateProviderDto,
    ) {
        try {
            await this.providerService.checkImageAndOwnerExist(
                data.licenseImageId,
                data.ownerId,
            );

            const providerExist = await this.providerRepository.isExist({ id });
            if (!providerExist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'provider.error.notExist',
                );
            }

            const updatedProvider =
                await this.providerService.repository.updateAndGet(
                    { id },
                    data,
                );

            return new SuccessResponse(
                new ProviderResponseDto(updatedProvider),
            );
        } catch (error) {
            this.handleError(error);
        }
    }

    @Delete(':id')
    @Auth(['delete_provider'])
    async deleteProvider(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const providerExist = await this.providerRepository.isExist({ id });
            if (!providerExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'provider.error.notExist',
                );
            }

            const deleteResult = await this.providerService.softDelete(id);

            return new SuccessResponse({ id }, 'provider.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
