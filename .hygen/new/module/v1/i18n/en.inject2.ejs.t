---
inject: true
to: src/i18n/en/index.ts
at_line: 0
skip_if: import <%= h.varName(name) %>
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>import <%= varName %> from './<%= varName %>.json';
