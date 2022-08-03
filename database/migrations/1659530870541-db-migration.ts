import {MigrationInterface, QueryRunner} from "typeorm";

export class dbMigration1659530870541 implements MigrationInterface {
    name = 'dbMigration1659530870541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission_resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`resource\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission_action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`action\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`permissionActionId\` int NOT NULL, \`permissionResourceId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`userId\` int NOT NULL, \`roleId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`fileName\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`size\` int NOT NULL DEFAULT '0', \`mimeType\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`qrCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NULL DEFAULT '0', \`description\` longtext NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`categoryId\` int NOT NULL, \`imageId\` int NOT NULL, \`providerId\` int NOT NULL, UNIQUE INDEX \`REL_b1b332c0f436897f21a960f26c\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`name\` varchar(255) NOT NULL, \`address\` longtext NOT NULL, \`description\` longtext NOT NULL, \`status\` enum ('ACCEPT', 'REJECT', 'WAITING_FOR_APPROVAL') NOT NULL DEFAULT 'WAITING_FOR_APPROVAL', \`licenseImageId\` int NULL, \`ownerId\` int NOT NULL, UNIQUE INDEX \`REL_dc0d51158b8c3b2d83f726c5d3\` (\`licenseImageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`fullName\` varchar(255) NOT NULL, \`birthday\` date NULL, \`phoneNumber\` varchar(255) NULL, \`gender\` enum ('male', 'female', 'other') NULL, \`status\` enum ('waiting_for_approval', 'inactive', 'active') NOT NULL DEFAULT 'waiting_for_approval', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`rate\` int NOT NULL DEFAULT '1', \`comment\` varchar(255) NULL, \`isFavorite\` tinyint NOT NULL DEFAULT 0, \`productId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`userId\` int NOT NULL, \`hashToken\` varchar(2000) NOT NULL, \`token\` blob NOT NULL, \`type\` enum ('refresh_token', 'access_token') NOT NULL DEFAULT 'refresh_token', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_88e863f3b6fe27b0f298af6ca0a\` FOREIGN KEY (\`permissionResourceId\`) REFERENCES \`permission_resource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_40f486212ff22a20c5ff218071b\` FOREIGN KEY (\`permissionActionId\`) REFERENCES \`permission_action\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_ab40a6f0cd7d3ebfcce082131fd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_dba55ed826ef26b5b22bd39409b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_f70b268affe05f6e9df0dab57b0\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD CONSTRAINT \`FK_dc0d51158b8c3b2d83f726c5d30\` FOREIGN KEY (\`licenseImageId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD CONSTRAINT \`FK_5f331beb514de4f4bdf78eb2872\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_b2e3f7568dafa9e86ae03910111\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_35d0a3fbfc65307c75a5f9db1e9\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_d37db50eecdf9b8ce4eedd2f918\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_d37db50eecdf9b8ce4eedd2f918\``);
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_35d0a3fbfc65307c75a5f9db1e9\``);
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_b2e3f7568dafa9e86ae03910111\``);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP FOREIGN KEY \`FK_5f331beb514de4f4bdf78eb2872\``);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP FOREIGN KEY \`FK_dc0d51158b8c3b2d83f726c5d30\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_f70b268affe05f6e9df0dab57b0\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_dba55ed826ef26b5b22bd39409b\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_ab40a6f0cd7d3ebfcce082131fd\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_40f486212ff22a20c5ff218071b\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_88e863f3b6fe27b0f298af6ca0a\``);
        await queryRunner.query(`DROP TABLE \`user_token\``);
        await queryRunner.query(`DROP TABLE \`action\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_dc0d51158b8c3b2d83f726c5d3\` ON \`provider\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
        await queryRunner.query(`DROP INDEX \`REL_b1b332c0f436897f21a960f26c\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission_action\``);
        await queryRunner.query(`DROP TABLE \`permission_resource\``);
    }

}
