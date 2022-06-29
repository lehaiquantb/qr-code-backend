import {MigrationInterface, QueryRunner} from "typeorm";

export class dbMigration1656410628673 implements MigrationInterface {
    name = 'dbMigration1656410628673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_ab40a6f0cd7d3ebfcce082131fd\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_dba55ed826ef26b5b22bd39409b\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`deletedBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`userId\`, \`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`roleId\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`roleId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`id\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`userId\`, \`id\`, \`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`IDX_ab40a6f0cd7d3ebfcce082131f\` ON \`user_role\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_dba55ed826ef26b5b22bd39409\` ON \`user_role\` (\`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_ab40a6f0cd7d3ebfcce082131fd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_dba55ed826ef26b5b22bd39409b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_dba55ed826ef26b5b22bd39409b\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_ab40a6f0cd7d3ebfcce082131fd\``);
        await queryRunner.query(`DROP INDEX \`IDX_dba55ed826ef26b5b22bd39409\` ON \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab40a6f0cd7d3ebfcce082131f\` ON \`user_role\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`userId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`roleId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`userId\`, \`roleId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`userId\`, \`roleId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`deletedBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`deletedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_dba55ed826ef26b5b22bd39409b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_ab40a6f0cd7d3ebfcce082131fd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
