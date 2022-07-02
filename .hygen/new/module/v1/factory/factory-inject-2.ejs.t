---
inject: true
to: database/factories/index.ts
at_line: 1
skip_if: <%= h.fileName(name) %>.factory
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import <%= varName %>Factory from './<%= fileName %>.factory';