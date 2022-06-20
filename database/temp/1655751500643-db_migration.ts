import {MigrationInterface, QueryRunner} from "typeorm";

export class dbMigration1655751500643 implements MigrationInterface {
    name = 'dbMigration1655751500643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_ab40a6f0cd7d3ebfcce082131fd\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_dba55ed826ef26b5b22bd39409b\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_d37db50eecdf9b8ce4eedd2f918\``);
        await queryRunner.query(`CREATE TABLE \`permission_resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`resource\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission_action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`action\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`permissionActionId\` int NOT NULL, \`permissionResourceId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tenantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_88e863f3b6fe27b0f298af6ca0a\` FOREIGN KEY (\`permissionResourceId\`) REFERENCES \`permission_resource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_40f486212ff22a20c5ff218071b\` FOREIGN KEY (\`permissionActionId\`) REFERENCES \`permission_action\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_ab40a6f0cd7d3ebfcce082131fd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_dba55ed826ef26b5b22bd39409b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_d37db50eecdf9b8ce4eedd2f918\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_d37db50eecdf9b8ce4eedd2f918\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_dba55ed826ef26b5b22bd39409b\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_ab40a6f0cd7d3ebfcce082131fd\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_40f486212ff22a20c5ff218071b\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_88e863f3b6fe27b0f298af6ca0a\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_token\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_role\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tenantId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`description\``);
        await queryRunner.query(`DROP TABLE \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission_action\``);
        await queryRunner.query(`DROP TABLE \`permission_resource\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_d37db50eecdf9b8ce4eedd2f918\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_dba55ed826ef26b5b22bd39409b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_ab40a6f0cd7d3ebfcce082131fd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
