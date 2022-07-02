---
inject: true
to: database/constant.ts
after: TABLE_NAME
skip_if: <%= h.constantName(name) %>
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>  <%= constantName %> = '<%= table_name %>',