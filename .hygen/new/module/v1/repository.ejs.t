---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.repository.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~common';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import { <%= ClassName %>QueryBuilder } from '~<%= fileName %>/<%= fileName %>.builder';

@EntityRepository(<%= ClassName %>Entity)
export class <%= ClassName %>Repository extends BaseRepository<<%= ClassName %>Entity> {
    builder(alias: string): <%= ClassName %>QueryBuilder {
        return new <%= ClassName %>QueryBuilder(this.createQueryBuilder(alias));
    }

    constructor() {
        super();
    }
}
