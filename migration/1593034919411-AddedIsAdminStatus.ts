import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedIsAdminStatus1593034919411 implements MigrationInterface {
  name = 'AddedIsAdminStatus1593034919411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
  }
}
