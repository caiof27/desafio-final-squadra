import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco> {
  public async findBycodigoEndereco(
    codigoBairro: number,
  ): Promise<Endereco | undefined> {
    const bairro = await this.findOne({ where: { codigoBairro } });
    return bairro;
  }

  public async findBycodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco | undefined> {
    const bairro = await this.findOne({ where: { codigoPessoa } });
    return bairro;
  }
}

export default EnderecoRepository;
