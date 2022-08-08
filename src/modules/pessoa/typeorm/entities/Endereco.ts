import Bairro from '@modules/bairro/typeorm/entities/Bairro';
import Pessoa from './Pessoa';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('endereco')
class Endereco {
  @PrimaryGeneratedColumn()
  codigoEndereco: number;

  @ManyToOne(() => Pessoa, Pessoa => Pessoa.endereco)
  @JoinColumn({ name: 'codigoPessoa' })
  pessoa: Pessoa;

  @Column('int')
  codigoPessoa: number;

  @ManyToOne(() => Bairro, Bairro => Bairro.codigoBairro)
  @JoinColumn({ name: 'codigoBairro' })
  bairro: Bairro;

  @Column('int')
  codigoBairro: number;

  @Column()
  nomeRua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  cep: string;
}

export default Endereco;
