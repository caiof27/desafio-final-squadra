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
    const bairro = await this.find({ where: { codigoMunicipio }, take: 1 });
    return bairro;
  }
  public async findByNome(nome: string): Promise<Bairro[] | undefined> {
    const bairro = await this.find({ where: { nome }, take: 1 });
    return bairro;
  }
  public async findByStatus(status: number): Promise<Bairro[] | undefined> {
    const bairro = await this.find({ where: { status } });
    return bairro;
  }
  public async findByCodBairroNome(
    codigoBairro: number,
    nome: string,
  ): Promise<Bairro[] | undefined> {
    const bairro = await this.find({
      where: { codigoBairro, nome },
      take: 1,
    });
    return bairro;
  }
  public async findByCodigoMunicipioNome(
    codigoMunicipio: number,
    nome: string,
  ): Promise<Bairro[] | undefined> {
    const bairro = await this.find({
      where: { codigoMunicipio, nome },
      take: 1,
    });
    return bairro;
  }
}

export default BairroRepository;
