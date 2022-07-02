---
to: "<%= h.path(name) %>/<%= h.fileName(name) %>.constant.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
%>
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
const Joi = BaseJoi.extend(JoiDate);

export const <%= varName %>DetailAttributes: (keyof <%= ClassName %>Entity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
