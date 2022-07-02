---
inject: true
to: src/common/constants/permission.constant.ts
after: PERMISSION_RESOURCE
skip_if: <%= h.constantName(name) %>
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%><%= constantName %> = '<%= table_name %>',