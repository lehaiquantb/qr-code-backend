---
inject: true
to: database/factories/index.ts
after: // hygen inject
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>
    [<%= ClassName %>Entity.name]: <%= varName %>Factory,
