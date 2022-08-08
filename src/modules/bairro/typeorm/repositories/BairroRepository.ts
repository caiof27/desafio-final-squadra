import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entities/Bairro';

@EntityRepository(Bairro)
class BairroRepository extends Repository<Bairro> {
  public async findBycodigoBairro(
    codigoBairro: number,
  ): Promise<Bairro | undefined> {
    const bairro = await this.findOne({ where: { codigoBairro } });
    return bairro;
  }
  public async findBycodigoMunicipio(
    codigoMunicipio: number,
  ): Promise<Bairro[] | undefined> {
    const bairro = await this.find({ where: { codigoMunicipio } });
    return bairro;
  }
  public async findByNome(nome: string): Promise<Bairro | undefined> {
    const bairro = await this.findOne({ where: { nome } });
    return bairro;
  }
  public async findByStatus(status: number): Promise<Bairro[] | undefined> {
    const bairro = await this.find({ where: { status } });
    return bairro;
  }
}

export default BairroRepository;
