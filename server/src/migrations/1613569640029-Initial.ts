import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1613569640029 implements MigrationInterface {
    name = 'Initial1613569640029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "socialNumber" character varying NOT NULL, "address" character varying NOT NULL, "privateKey" character varying NOT NULL, CONSTRAINT "PK_c1a0d8fd992c199219325d43705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "voter"`);
    }

}
