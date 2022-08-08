import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignColumnsToEndereco1659905090053
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'endereco',
      new TableColumn({
        name: 'codigoPessoa',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'endereco',
      new TableForeignKey({
        name: 'enderecoPessoa_codigoPessoa',
        columnNames: ['codigoPessoa'],
        referencedTableName: 'pessoa',
        referencedColumnNames: ['codigoPessoa'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.addColumn(
      'endereco',
      new TableColumn({
        name: 'codigoBairro',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'endereco',
      new TableForeignKey({
        name: 'enderecoBairro_CodigoBairro',
        columnNames: ['codigoBairro'],
        referencedTableName: 'bairro',
        referencedColumnNames: ['codigoBairro'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('endereco', 'enderecoPessoa_codigoPessoa');
    await queryRunner.dropColumn('endereco', 'codigoPessoa');
    await queryRunner.dropForeignKey('endereco', 'enderecoBairro_CodigoBairro');
    await queryRunner.dropColumn('endereco', 'codigoBairro');
  }
}
