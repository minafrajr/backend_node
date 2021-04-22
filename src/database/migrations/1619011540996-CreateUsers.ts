import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1619011540996 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'char(36)',
						isPrimary: true,
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{ name: 'created_at', type: 'datetime', default: 'now()' },
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('users');
	}
}
