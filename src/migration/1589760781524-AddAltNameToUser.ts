import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAltNameToUser1589760781524 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user ADD altName varchar(255)')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user DROP COLUMN altName')
    }
}
