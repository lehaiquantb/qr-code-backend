
import { RateEntity } from '~rate/entity/rate.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute } from '~database/factories';
dotenv.config();
export class Rate_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = [];

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
