import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675223990341 implements MigrationInterface {
    name = 'default1675223990341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_tasks" ("task_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a85a01992fcab4ed8f6ab7a32a4" PRIMARY KEY ("task_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_afb3dd8247c27198df5b9a8123" ON "users_tasks" ("task_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aff222521447e7e0e4c51ff100" ON "users_tasks" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "departaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tasks" ADD CONSTRAINT "FK_afb3dd8247c27198df5b9a81235" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tasks" ADD CONSTRAINT "FK_aff222521447e7e0e4c51ff1007" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tasks" DROP CONSTRAINT "FK_aff222521447e7e0e4c51ff1007"`);
        await queryRunner.query(`ALTER TABLE "users_tasks" DROP CONSTRAINT "FK_afb3dd8247c27198df5b9a81235"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aff222521447e7e0e4c51ff100"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afb3dd8247c27198df5b9a8123"`);
        await queryRunner.query(`DROP TABLE "users_tasks"`);
    }

}
