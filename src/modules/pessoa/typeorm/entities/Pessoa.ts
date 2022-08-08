import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Endereco from './Endereco';
@Entity('pessoa')
class Pessoa {
  @PrimaryGeneratedColumn()
  codigoPessoa: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column('int')
  idade: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column('int')
  status: number;

  @OneToMany(() => Endereco, Endereco => Endereco.pessoa)
  endereco: Endereco[];
}

export default Pessoa;
