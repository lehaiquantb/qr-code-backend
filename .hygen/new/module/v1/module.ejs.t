---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.module.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= ClassName %>Service } from '~<%= fileName %>/services/<%= fileName %>.service';
import { <%= ClassName %>Controller } from '~<%= fileName %>/<%= fileName %>.controller';
import { <%= ClassName %>Repository } from '~<%= fileName %>/<%= fileName %>.repository';

@Module({
    imports: [TypeOrmModule.forFeature([<%= ClassName %>Repository])],
    controllers: [<%= ClassName %>Controller],
    providers: [<%= ClassName %>Service, DatabaseService],
    exports: [<%= ClassName %>Service],
})
export class <%= ClassName %>Module {}
