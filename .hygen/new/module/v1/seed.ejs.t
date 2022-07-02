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
%>
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class <%= ClassName %>_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
