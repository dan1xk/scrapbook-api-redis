import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm';

export class Errands1649819092902 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'scrapbook.errands',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false
                    },
                    {
                        name: 'errands',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        referencedTableName: 'scrapbook.user',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id']
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('scrapbook.errands', true, true, true);
    }
}
