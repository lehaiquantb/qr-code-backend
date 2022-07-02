---
to: "database/factories/<%= h.table_name(name) %>.factory.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>
import { faker } from '@faker-js/faker';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import { FactoryDefine } from '.';

const <%= varName %>Factory: FactoryDefine<<%= ClassName %>Entity> = async () => {
    const <%= varName %> = new <%= ClassName %>Entity();
    return <%= varName %>;
};

export default <%= varName %>Factory;
