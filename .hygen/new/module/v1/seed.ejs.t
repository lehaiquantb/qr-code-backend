---
to: "database/seedings/000.<%= h.fileName(name) %>.seed.ts"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
 constantName = h.constantName(name);
 table_name = h.table_name(name);
%>import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, ParamsExtend } from '~database/factories';
import { TABLE_NAME } from '~database/constant';

dotenv.config();

export let <%= varName %>List: ParamsExtend<<%= ClassName %>Entity>[] = [
    {
        id: 1,
    },
];

export class <%= ClassName %>_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = <%= varName %>List.map(async (item) =>
            factoryExcute(<%= ClassName %>Entity, {
                ...item,
            }),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.<%= constantName %>).clear()
    }
}
