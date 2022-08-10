import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';

@EntityRepository(Pessoa)
class PessoaRepository extends Repository<Pessoa> {
  public async findAll(): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find();

    for (let aux = 0; aux < pessoa.length; aux++) {
      pessoa[aux].enderecos = [];
    }

    return pessoa;
  }
  public async findBycodigoPessoa(
    codigoPessoa: number,
  ): Promise<Pessoa | undefined> {
    const pessoa = await this.createQueryBuilder('pessoa')
      .leftJoinAndSelect('pessoa.enderecos', 'endereco')
      .leftJoinAndSelect('endereco.bairro', 'bairro')
      .leftJoinAndSelect('bairro.municipio', 'municipio')
      .leftJoinAndSelect('municipio.uf', 'uf')
      .where('pessoa.codigoPessoa = :codigoPessoa', {
        codigoPessoa: codigoPessoa,
      })
      .getOne();
    return pessoa;
  }
  public async findByLogin(login: string): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find({ where: { login } });

    for (let aux = 0; aux < pessoa.length; aux++) {
      pessoa[aux].enderecos = [];
    }

    return pessoa;
  }
  public async findByStatus(status: number): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find({ where: { status } });

    for (let aux = 0; aux < pessoa.length; aux++) {
      pessoa[aux].enderecos = [];
    }

    return pessoa;
  }
}

export default PessoaRepository;
