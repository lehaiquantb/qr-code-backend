import { PermissionResourceEntity } from '../../src/modules/role/entity/permission-resource.entity';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from '~common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class SeedingPermissionResource1720963593422
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.USER,
            }),
            factoryExcute(PermissionResourceEntity, {
                resource: PERMISSION_RESOURCE.PRODUCT,
            }),
        ];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
