import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitalChatMessages1593685180295 implements MigrationInterface {
  name = 'InitalChatMessages1593685180295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL DEFAULT 'message', "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateDate" TIMESTAMP WITH TIME ZONE DEFAULT NULL, "text" text NOT NULL, "chatId" uuid, "userId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstUserId" uuid, "secondUserId" uuid, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_9b8a67f3b3395dd754357ca68ad" FOREIGN KEY ("firstUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_a99e04811f666b1c48f6918085b" FOREIGN KEY ("secondUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_a99e04811f666b1c48f6918085b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_9b8a67f3b3395dd754357ca68ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`,
    );
    await queryRunner.query(`DROP TABLE "chat"`);
    await queryRunner.query(`DROP TABLE "message"`);
  }
}
