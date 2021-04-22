import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateMessages1619020833090 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'messages',
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
						name: 'text',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'datetime',
						default: 'now()',
					},
				],
				// foreignKeys: [
				// 	{
				// 		name: 'fk_users_messages',
				// 		referencedTableName: 'users',
				// 		referencedColumnNames: ['id'],
				// 		columnNames: ['user_id'],
				// 		onDelete: 'SET NULL',
				// 		onUpdate: 'SET NULL',
				// 	},
				// ],
			})
		);

		await queryRunner.createForeignKey(
			'messages',
			new TableForeignKey({
				name: 'fk_users_messages',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropForeignKey('messages', '');
		queryRunner.dropTable('messages');
	}
}
