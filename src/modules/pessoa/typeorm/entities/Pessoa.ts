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

  @Column()
  idade: string;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column('int')
  status: number;

  @OneToMany(() => Endereco, Endereco => Endereco.pessoa)
  enderecos: Endereco[];
}

export default Pessoa;
