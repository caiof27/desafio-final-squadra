import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEndereco1659904898305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'endereco',
        columns: [
          {
            name: 'codigoEndereco',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nomeRua',
            type: 'varchar',
          },
          {
            name: 'numero',
            type: 'int',
          },
          {
            name: 'complemento',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('endereco');
  }
}
