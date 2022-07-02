---
to: "src/i18n/vi/<%= h.varName(name) %>.json"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
 humanName = h.humanName(name);
%>{
    "error": {
        "notFound": "<%= humanName %> not found",
        "exist": "<%= humanName %> already exists",
        "notExist": "<%= humanName %> does not exist"
    },
    "success": {
        "create": "<%= humanName %> created successfully",
        "update": "<%= humanName %> updated successfully",
        "delete": "<%= humanName %> deleted successfully"
    }
}