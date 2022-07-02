---
to: "<%= h.path(name) %>/dto/request/<%= h.requestDtoFileName(name) %>"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
%>import { QueryParamDto, RequestDto } from '~common';
import * as Joi from 'joi';
export const <%= ClassName %>Schema = {
    id: Joi.number(),
};

export class Create<%= ClassName %>Dto extends RequestDto {}

export class Query<%= ClassName %>Dto extends QueryParamDto {}

export class QueryList<%= ClassName %>Dto extends QueryParamDto {}

export class Update<%= ClassName %>Dto extends RequestDto {}
