import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettings1618921831296 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'settings',
				columns: [
					{
						name: 'id',
						type: 'char(36)',

						isPrimary: true,
					},
					{ name: 'username', type: 'varchar' },
					{
						name: 'chat',
						type: 'boolean',
						default: true,
					},
					{
						name: 'updated_at',
						type: 'datetime',
						default: 'now()',
					},
					{
						name: 'created_at',
						type: 'datetime',
						default: 'now()',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('settings');
	}
}
