import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialVacation1592980056946 implements MigrationInterface {
  name = 'InitialVacation1592980056946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vacation" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid, CONSTRAINT "PK_b98b2da5d138aa464c5d1431135" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacation" ADD CONSTRAINT "FK_b8ecb37781cb6faa4503793f6f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacation" DROP CONSTRAINT "FK_b8ecb37781cb6faa4503793f6f3"`,
    );
    await queryRunner.query(`DROP TABLE "vacation"`);
  }
}
