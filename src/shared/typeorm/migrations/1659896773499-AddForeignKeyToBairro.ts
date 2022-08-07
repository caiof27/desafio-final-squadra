import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignColumnsToBairro1659882223913
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bairro',
      new TableColumn({
        name: 'codigoMunicipio',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'bairro',
      new TableForeignKey({
        name: 'bairroMunicipio_CodigoMunicipio',
        columnNames: ['codigoMunicipio'],
        referencedTableName: 'municipio',
        referencedColumnNames: ['codigoMunicipio'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'bairro',
      'bairroMunicipio_CodigoMunicipio',
    );
    await queryRunner.dropColumn('bairro', 'codigoMunicipio');
  }
}
