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
import { ProviderService } from '~provider/services/provider.service';

import {
    ProviderResponseDto,
    ProviderListResponseDto,
} from '~provider/dto/response/provider.response.dto';
import { ProviderRepository } from '~provider/provider.repository';
import {
    QueryListProviderDto,
    CreateProviderDto,
    UpdateProviderDto,
} from '~provider/dto/request/provider.request.dto';

@Controller('provider')
@ApiTags('Provider')
export class ProviderController extends BaseController {
    constructor(
        private readonly providerService: ProviderService,
        private readonly databaseService: DatabaseService,
        private readonly providerRepository: ProviderRepository,
    ) {
        super();
    }

    @Get(':id')
    async getProvider(@Param('id', ParseIntPipe) id: number) {
        try {
            const provider = await this.providerService.findById(id);
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
    async getProviderList(
        @Query()
        query: QueryListProviderDto,
    ) {
        try {
            const providerList: ProviderListResponseDto =
                await this.providerService.queryProviderList(query);
            return new SuccessResponse(providerList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async createProvider(
        @Request() req: IRequest,
        @Body() data: CreateProviderDto,
    ) {
        try {
            const providerExist = await this.providerRepository.isExist({});
            if (providerExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'provider.error.exist',
                );
            }

            const insertedProvider =
                await this.providerService.repository.insertAndGet(data);

            return new SuccessResponse(
                new ProviderResponseDto(insertedProvider),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateProvider(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateProviderDto,
    ) {
        try {
            const providerExist = await this.providerRepository.isExist({ id });
            if (!providerExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'provider.error.notExist',
                );
            }

            const updatedProvider = await this.providerService.update(id, data);

            return new SuccessResponse(
                new ProviderResponseDto(updatedProvider),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
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
