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
import { ActionService } from '~action/services/action.service';

import {
    ActionResponseDto,
    ActionListResponseDto,
} from '~action/dto/response/action.response.dto';
import { ActionRepository } from '~action/action.repository';
import {
    QueryListActionDto,
    CreateActionDto,
    UpdateActionDto,
} from '~action/dto/request/action.request.dto';

@Controller('action')
@ApiTags('Action')
export class ActionController extends BaseController {
    constructor(
        private readonly actionService: ActionService,
        private readonly databaseService: DatabaseService,
        private readonly actionRepository: ActionRepository,
    ) {
        super();
    }

    @Get(':id')
    async getAction(@Param('id', ParseIntPipe) id: number) {
        try {
            const action = await this.actionService.findById(id);
            if (!action) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'action.error.notFound',
                );
            }
            return new SuccessResponse(new ActionResponseDto(action));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getActionList(
        @Query()
        query: QueryListActionDto,
    ) {
        try {
            const actionList: ActionListResponseDto =
                await this.actionService.queryActionList(query);
            return new SuccessResponse(actionList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async createAction(
        @Request() req: IRequest,
        @Body() data: CreateActionDto,
    ) {
        try {
            const actionExist = await this.actionRepository.isExist({});
            if (actionExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'action.error.exist',
                );
            }

            const insertedAction =
                await this.actionService.repository.insertAndGet(data);

            return new SuccessResponse(new ActionResponseDto(insertedAction));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateAction(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateActionDto,
    ) {
        try {
            const actionExist = await this.actionRepository.isExist({ id });
            if (!actionExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'action.error.notExist',
                );
            }

            const updatedAction = await this.actionService.update(id, data);

            return new SuccessResponse(new ActionResponseDto(updatedAction));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async deleteAction(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const actionExist = await this.actionRepository.isExist({ id });
            if (!actionExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'action.error.notExist',
                );
            }

            const deleteResult = await this.actionService.softDelete(id);

            return new SuccessResponse({ id }, 'action.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
