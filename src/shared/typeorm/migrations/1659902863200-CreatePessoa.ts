import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePessoa1659902863200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoa',
        columns: [
          {
            name: 'codigoPessoa',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'sobrenome',
            type: 'varchar',
          },
          {
            name: 'idade',
            type: 'int',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'senha',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pessoa');
  }
}
