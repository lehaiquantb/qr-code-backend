---
to: "<%= h.path(name) %>/services/<%= h.fileName(name) %>.service.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>import { QueryList<%= ClassName %>Dto } from '~<%= fileName %>/dto/request/<%= fileName %>.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseService, IRequest } from '~common';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import { <%= ClassName %>Repository } from '~<%= fileName %>/<%= fileName %>.repository';
import { <%= ClassName %>ListResponseDto } from '~<%= fileName %>/dto/response/<%= fileName %>.response.dto';

@Injectable()
export class <%= ClassName %>Service extends BaseService<
    <%= ClassName %>Entity,
    <%= ClassName %>Repository
> {
    constructor(
        @Inject(REQUEST) private readonly request: IRequest,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly <%= varName %>Repository: <%= ClassName %>Repository,
    ) {
        super(<%= varName %>Repository);
    }

    async query<%= ClassName %>List(
        queryParam: QueryList<%= ClassName %>Dto,
    ): Promise<<%= ClassName %>ListResponseDto> {
        const <%= varName %>Entities: <%= ClassName %>Entity[] = [];

        return new <%= ClassName %>ListResponseDto(<%= varName %>Entities);
    }
}
