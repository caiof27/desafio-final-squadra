import Uf from '@modules/uf/typeorm/entities/Uf';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('municipio')
class Municipio {
  @PrimaryGeneratedColumn()
  codigoMunicipio: number;

  @ManyToOne(() => Uf, Uf => Uf.codigoUF)
  @JoinColumn({ name: 'codigoUF' })
  uf: Uf;

  @Column('int')
  codigoUF: number;

  @Column()
  nome: string;

  @Column('int')
  status: number;
}

export default Municipio;
