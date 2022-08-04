import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('uf')
class Uf {
  @PrimaryGeneratedColumn('increment')
  codigoUF: number;

  @Column()
  sigla: string;

  @Column('decimal')
  nome: string;

  @Column('int')
  status: number;
}

export default Uf;
