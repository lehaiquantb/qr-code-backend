---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.interface.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>
// your interface