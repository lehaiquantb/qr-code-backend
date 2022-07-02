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
import { RateService } from '~rate/services/rate.service';

import {
    RateResponseDto,
    RateListResponseDto,
} from '~rate/dto/response/rate.response.dto';
import { RateRepository } from '~rate/rate.repository';
import {
    QueryListRateDto,
    CreateRateDto,
    UpdateRateDto,
} from '~rate/dto/request/rate.request.dto';

@Controller('rate')
@ApiTags('Rate')
export class RateController extends BaseController {
    constructor(
        private readonly rateService: RateService,
        private readonly databaseService: DatabaseService,
        private readonly rateRepository: RateRepository,
    ) {
        super();
    }

    @Get(':id')
    async getRate(@Param('id', ParseIntPipe) id: number) {
        try {
            const rate = await this.rateService.findById(id);
            if (!rate) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'rate.common.error.rate.notFound',
                );
            }
            return new SuccessResponse(new RateResponseDto(rate));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getRateList(
        @Query()
        query: QueryListRateDto,
    ) {
        try {
            const rateList: RateListResponseDto =
                await this.rateService.queryRateList(query);
            return new SuccessResponse(rateList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async createRate(@Request() req: IRequest, @Body() data: CreateRateDto) {
        try {
            const rateExist = await this.rateRepository.isExist({});
            if (rateExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'rate.common.error.exist',
                );
            }

            const insertedRate = await this.rateService.repository.insertAndGet(
                data,
            );

            return new SuccessResponse(new RateResponseDto(insertedRate));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateRate(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateRateDto,
    ) {
        try {
            const rateExist = await this.rateRepository.isExist({ id });
            if (rateExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'rate.common.error.exist',
                );
            }

            const updatedRate = await this.rateService.update(id, data);

            return new SuccessResponse(new RateResponseDto(updatedRate));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async deleteRate(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const rateExist = await this.rateRepository.isExist({ id });
            if (rateExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'rate.common.error.exist',
                );
            }

            const deleteResult = await this.rateService.softDelete(id);

            return new SuccessResponse({ id }, 'rate.delete.success');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
