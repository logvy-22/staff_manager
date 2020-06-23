import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1592920768329 implements MigrationInterface {
  name = 'user1592920768329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "avatar" TO "photo"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "photo" TO "avatar"`,
    );
  }
}
