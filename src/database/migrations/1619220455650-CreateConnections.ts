import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateConnections1619220455650 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'connections',
				columns: [
					{
						name: 'id',
						type: 'char(36)',
						isPrimary: true,
					},
					{
						name: 'admin_id',
						type: 'char(36)',
						isNullable: true,
					},
					{
						name: 'user_id',
						type: 'char(36)',
					},
					{
						name: 'created_at',
						type: 'datetime',
						default: 'now()',
					},

					{
						name: 'updated_at',
						type: 'datetime',
						default: 'now()',
					},
					{
						name: 'socket_id',
						type: 'varchar',
					},
				],
			})
		);
		await queryRunner.createForeignKey(
			'connections',
			new TableForeignKey({
				name: 'fk_connections_users',
				referencedTableName: 'users',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('connections', 'fk_connections_users');
		await queryRunner.dropTable('connections');
	}
}
