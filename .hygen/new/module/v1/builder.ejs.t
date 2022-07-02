---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.builder.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';

export class <%= ClassName %>QueryBuilder extends BaseQueryBuilder<<%= ClassName %>Entity> {
    constructor(queryBuilder: QueryBuilder<<%= ClassName %>Entity>) {
        super(queryBuilder);
    }
}
