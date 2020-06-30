import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitGallery1593100188635 implements MigrationInterface {
  name = 'InitGallery1593100188635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gallery" (
            id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            title character varying(80) NOT NULL,
            description character varying(256) NOT NULL,
            image character varying(256) NOT NULL,
            CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY (id)
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gallery"`);
  }
}
