---
inject: true
to: src/i18n/vi/index.ts
after: export default
skip_if: <%= h.varName(name) %>
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>
    <%= varName %>,