import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUser1592979952582 implements MigrationInterface {
  name = 'InitialUser1592979952582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(80) NOT NULL, "firstName" character varying(80), "lastName" character varying(80), "createDateTime" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "department" character varying(80), "position" character varying(80), "photo" bytea, "isActive" boolean NOT NULL DEFAULT false, "isBanned" boolean NOT NULL DEFAULT false, "password" character varying(80) NOT NULL, "location" point, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
