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
import { FileService } from '~file/services/file.service';

import {
    FileResponseDto,
    FileListResponseDto,
} from '~file/dto/response/file.response.dto';
import { FileRepository } from '~file/file.repository';
import {
    QueryListFileDto,
    CreateFileDto,
    UpdateFileDto,
} from '~file/dto/request/file.request.dto';

@Controller('file')
@ApiTags('File')
export class FileController extends BaseController {
    constructor(
        private readonly fileService: FileService,
        private readonly databaseService: DatabaseService,
        private readonly fileRepository: FileRepository,
    ) {
        super();
    }

    @Get(':id')
    async getFile(@Param('id', ParseIntPipe) id: number) {
        try {
            const file = await this.fileService.findById(id);
            if (!file) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'file.error.notFound',
                );
            }
            return new SuccessResponse(new FileResponseDto(file));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getFileList(
        @Query()
        query: QueryListFileDto,
    ) {
        try {
            const fileList: FileListResponseDto =
                await this.fileService.queryFileList(query);
            return new SuccessResponse(fileList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async createFile(@Request() req: IRequest, @Body() data: CreateFileDto) {
        try {
            const fileExist = await this.fileRepository.isExist({});
            if (fileExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'file.error.exist',
                );
            }

            const insertedFile = await this.fileService.repository.insertAndGet(
                data,
            );

            return new SuccessResponse(new FileResponseDto(insertedFile));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateFile(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: UpdateFileDto,
    ) {
        try {
            const fileExist = await this.fileRepository.isExist({ id });
            if (!fileExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'file.error.notExist',
                );
            }

            const updatedFile = await this.fileService.update(id, data);

            return new SuccessResponse(new FileResponseDto(updatedFile));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async deleteFile(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const fileExist = await this.fileRepository.isExist({ id });
            if (!fileExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'file.error.notExist',
                );
            }

            const deleteResult = await this.fileService.softDelete(id);

            return new SuccessResponse({ id }, 'file.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
