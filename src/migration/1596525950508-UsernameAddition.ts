import {MigrationInterface, QueryRunner} from "typeorm";

export class UsernameAddition1596525950508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE User ADD COLUMN username VARCHAR(255) NOT NULL')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE User DROP COLUMN username')
    }

}
