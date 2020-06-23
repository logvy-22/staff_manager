import {MigrationInterface, QueryRunner} from "typeorm";

export class userLocation1592924244776 implements MigrationInterface {
    name = 'userLocation1592924244776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" TYPE point`);
    }

}
