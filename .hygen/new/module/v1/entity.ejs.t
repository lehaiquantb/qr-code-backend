---
to: "<%= h.path(name) %>/entity/<%= h.fileName(name) %>.entity.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>
import { TABLE_NAME } from '~database/constant';
import { Entity } from 'typeorm';
import { BaseEntity } from '~common';
import { <%= ClassName %>QueryBuilder } from '~<%= fileName %>/<%= fileName %>.builder';

const NAME = TABLE_NAME.<%= constantName %>;
@Entity({ name: NAME })
export class <%= ClassName %>Entity extends BaseEntity {
    static builder(alias: string) {
        return new <%= ClassName %>QueryBuilder(<%= ClassName %>Entity.createQueryBuilder(alias));
    }
}
