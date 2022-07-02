---
inject: true
to: database/constant.ts
after: TABLE_NAME
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>
<%= constantName %> = '<%= h.changeCase.lower(constantName) %>',