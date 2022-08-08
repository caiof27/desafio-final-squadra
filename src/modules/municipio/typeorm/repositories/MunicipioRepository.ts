import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entities/Municipio';

@EntityRepository(Municipio)
class MunicipioRepository extends Repository<Municipio> {
  public async findBycodigoMunicipio(
    codigoMunicipio: number,
  ): Promise<Municipio | undefined> {
    const Municipio = await this.findOne({ where: { codigoMunicipio } });
    return Municipio;
  }
  public async findBycodigoUF(
    codigoUF: number,
  ): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { codigoUF } });
    return Municipio;
  }
  public async findByNome(nome: string): Promise<Municipio | undefined> {
    const Municipio = await this.findOne({ where: { nome } });
    return Municipio;
  }
  public async findByStatus(status: number): Promise<Municipio[] | undefined> {
    const Municipio = await this.find({ where: { status } });
    return Municipio;
  }
}

export default MunicipioRepository;
