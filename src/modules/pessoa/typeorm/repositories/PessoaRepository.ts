import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entities/Pessoa';

@EntityRepository(Pessoa)
class PessoaRepository extends Repository<Pessoa> {
  public async findAll(): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find();

    let aux = 0;

    while (aux < pessoa.length) {
      pessoa[aux].endereco = [];
      aux++;
    }

    return pessoa;
  }
  public async findBycodigoPessoa(
    codigoPessoa: number,
  ): Promise<Pessoa[] | undefined> {
    const pessoa = await this.createQueryBuilder('pessoa')
      .leftJoinAndSelect('pessoa.endereco', 'endereco')
      .where('pessoa.codigoPessoa = :codigoPessoa', {
        codigoPessoa: codigoPessoa,
      })
      .getMany();
    return pessoa;
  }
  public async findByLogin(login: string): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find({ where: { login } });

    pessoa[0].endereco = [];

    return pessoa;
  }
  public async findByStatus(status: number): Promise<Pessoa[] | undefined> {
    const pessoa = await this.find({ where: { status } });

    let aux = 0;

    while (aux < pessoa.length) {
      pessoa[aux].endereco = [];
      aux++;
    }

    return pessoa;
  }
}

export default PessoaRepository;
