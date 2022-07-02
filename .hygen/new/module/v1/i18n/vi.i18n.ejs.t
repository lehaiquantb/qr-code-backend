---
to: "i18n/vi/<%= h.fileName(name) %>.json"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
 humanName = h.humanName(name);
%>
{
    "error": {
        "notFound": "<%= humanName %> not found",
        "exist": "<%= humanName %> already exists"
    },
    "success": {
        "create": "<%= humanName %> created successfully",
        "update": "<%= humanName %> updated successfully",
        "delete": "<%= humanName %> deleted successfully"
    }
}