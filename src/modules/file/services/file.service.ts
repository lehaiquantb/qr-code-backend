import { QueryListFileDto } from '~file/dto/request/file.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { FileEntity } from '~file/entity/file.entity';
import { FileRepository } from '~file/file.repository';
import { FileListResponseDto } from '~file/dto/response/file.response.dto';

@Injectable()
export class FileService extends BaseService<FileEntity, FileRepository> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly fileRepository: FileRepository,
    ) {
        super(fileRepository);
    }

    async queryFileList(
        queryParam: QueryListFileDto,
    ): Promise<FileListResponseDto> {
        const fileEntities: FileEntity[] = [];

        return new FileListResponseDto(fileEntities);
    }
}
