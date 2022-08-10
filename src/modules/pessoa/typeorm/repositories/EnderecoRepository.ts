import { EntityRepository, In, Not, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco> {
  public async findBycodigoEndereco(
    codigoEndereco: number,
  ): Promise<Endereco | undefined> {
    const pessoa = await this.findOne({ where: { codigoEndereco } });
    return pessoa;
  }

  public async findBycodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco | undefined> {
    const pessoa = await this.findOne({ where: { codigoPessoa } });
    return pessoa;
  }

  public async findToRemove(
    array: Array<number>,
    codigoPessoa: number,
  ): Promise<Endereco[]> {
    const Endereco = await this.find({
      where: { codigoEndereco: Not(In(array)), codigoPessoa },
    });
    return Endereco;
  }
}

export default EnderecoRepository;
