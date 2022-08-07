import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCodigoUFToMunicipio1659725099148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'municipio',
      new TableColumn({
        name: 'codigoUF',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'municipio',
      new TableForeignKey({
        name: 'municipioUf_codigoUF',
        columnNames: ['codigoUF'],
        referencedTableName: 'uf',
        referencedColumnNames: ['codigoUF'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('municipio', 'municipioUf_codigoUF');
    await queryRunner.dropColumn('municipio', 'codigoUF');
  }
}
