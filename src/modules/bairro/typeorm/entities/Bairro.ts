import Municipio from '@modules/municipio/typeorm/entities/Municipio';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('bairro')
class Bairro {
  @PrimaryGeneratedColumn()
  codigoBairro: number;

  @ManyToOne(() => Municipio, Municipio => Municipio.codigoMunicipio)
  @JoinColumn({ name: 'codigoMunicipio' })
  municipio: Municipio;

  @Column('int')
  codigoMunicipio: number;

  @Column()
  nome: string;

  @Column('int')
  status: number;
}

export default Bairro;
