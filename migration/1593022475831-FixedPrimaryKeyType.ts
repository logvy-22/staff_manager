import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedPrimaryKeyType1593022475831 implements MigrationInterface {
    name = 'FixedPrimaryKeyType1593022475831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacation" DROP CONSTRAINT "PK_b98b2da5d138aa464c5d1431135"`);
        await queryRunner.query(`ALTER TABLE "vacation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vacation" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "vacation" ADD CONSTRAINT "PK_b98b2da5d138aa464c5d1431135" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacation" DROP CONSTRAINT "PK_b98b2da5d138aa464c5d1431135"`);
        await queryRunner.query(`ALTER TABLE "vacation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vacation" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacation" ADD CONSTRAINT "PK_b98b2da5d138aa464c5d1431135" PRIMARY KEY ("id")`);
    }

}
