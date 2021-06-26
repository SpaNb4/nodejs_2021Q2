/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MyMigration1624701992811 implements MigrationInterface {
    name = 'MyMigration1624701992811';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "board" ("id" uuid NOT NULL, "title" character varying NOT NULL, "columns" jsonb NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "task" ("id" uuid NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" uuid, "boardId" uuid NOT NULL, "columnId" character varying(150), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `INSERT INTO "user" (id, name, login, password) VALUES('281fa1bd-aa69-4b77-8624-94a7e490df48','admin', 'admin', 'admin')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }
}
