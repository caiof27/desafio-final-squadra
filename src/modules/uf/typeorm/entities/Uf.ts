import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('uf')
class Uf {
  @PrimaryGeneratedColumn()
  codigoUF: number;

  @Column()
  sigla: string;

  @Column()
  nome: string;

  @Column('int')
  status: number;
}

export default Uf;
