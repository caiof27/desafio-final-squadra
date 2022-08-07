import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';

@EntityRepository(Municipio)
class MunicipioRepository extends Repository<Municipio> {
  public async findBycodigoMunicipio(
    codigoMunicipio: number,
  ): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { codigoMunicipio }, take: 1 });
    return Municipio;
  }
  public async findBycodigoUF(
    codigoUF: number,
  ): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { codigoUF }, take: 1 });
    return Municipio;
  }
  public async findByNome(nome: string): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { nome }, take: 1 });
    return Municipio;
  }
  public async findByStatus(status: number): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { status } });
    return Municipio;
  }
  public async findByCodMunicipioNome(
    codigoMunicipio: number,
    nome: string,
  ): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({
      where: { codigoMunicipio, nome },
      take: 1,
    });
    return Municipio;
  }
  public async findByCodigoUfNome(
    codigoUF: number,
    nome: string,
  ): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { codigoUF, nome }, take: 1 });
    return Municipio;
  }
}

export default MunicipioRepository;
