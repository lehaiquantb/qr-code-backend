---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.controller.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>import {
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
import { <%= ClassName %>Service } from '~<%= fileName %>/services/<%= fileName %>.service';

import {
    <%= ClassName %>ResponseDto,
    <%= ClassName %>ListResponseDto,
} from '~<%= fileName %>/dto/response/<%= fileName %>.response.dto';
import { <%= ClassName %>Repository } from '~<%= fileName %>/<%= fileName %>.repository';
import {
    QueryList<%= ClassName %>Dto,
    Create<%= ClassName %>Dto,
    Update<%= ClassName %>Dto,
} from '~<%= fileName %>/dto/request/<%= fileName %>.request.dto';

@Controller('<%= fileName %>')
@ApiTags('<%= ClassName %>')
export class <%= ClassName %>Controller extends BaseController {
    constructor(
        private readonly <%= varName %>Service: <%= ClassName %>Service,
        private readonly databaseService: DatabaseService,
        private readonly <%= varName %>Repository: <%= ClassName %>Repository,
    ) {
        super();
    }

    @Get(':id')
    async get<%= ClassName %>(@Param('id', ParseIntPipe) id: number) {
        try {
            const <%= varName %> = await this.<%= varName %>Service.findById(id);
            if (!<%= varName %>) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    '<%= varName %>.error.notFound',
                );
            }
            return new SuccessResponse(new <%= ClassName %>ResponseDto(<%= varName %>));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async get<%= ClassName %>List(
        @Query()
        query: QueryList<%= ClassName %>Dto,
    ) {
        try {
            const <%= varName %>List: <%= ClassName %>ListResponseDto =
                await this.<%= varName %>Service.query<%= ClassName %>List(query);
            return new SuccessResponse(<%= varName %>List);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create<%= ClassName %>(
        @Request() req: IRequest,
        @Body() data: Create<%= ClassName %>Dto,
    ) {
        try {
            const <%= varName %>Exist = await this.<%= varName %>Repository.isExist({});
            if (<%= varName %>Exist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_ALREADY_EXIST,
                    '<%= varName %>.error.exist',
                );
            }

            const inserted<%= ClassName %> =
                await this.<%= varName %>Service.repository.insertAndGet(data);

            return new SuccessResponse(new <%= ClassName %>ResponseDto(inserted<%= ClassName %>));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async update<%= ClassName %>(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: Update<%= ClassName %>Dto,
    ) {
        try {
            const <%= varName %>Exist = await this.<%= varName %>Repository.isExist({ id });
            if (!<%= varName %>Exist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    '<%= varName %>.error.notExist',
                );
            }

            const updated<%= ClassName %> = await this.<%= varName %>Service.update(id, data);

            return new SuccessResponse(new <%= ClassName %>ResponseDto(updated<%= ClassName %>));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async delete<%= ClassName %>(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const <%= varName %>Exist = await this.<%= varName %>Repository.isExist({ id });
            if (!<%= varName %>Exist) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    '<%= varName %>.error.notExist',
                );
            }

            const deleteResult = await this.<%= varName %>Service.softDelete(id);

            return new SuccessResponse({ id }, '<%= varName %>.success.delete');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
