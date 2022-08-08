import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';

@EntityRepository(Uf)
class UfRepository extends Repository<Uf> {
  public async findBycodigoUF(codigoUF: number): Promise<Uf | undefined> {
    const uf = await this.findOne({ where: { codigoUF } });
    return uf;
  }
  public async findByNome(nome: string): Promise<Uf | undefined> {
    const uf = await this.findOne({ where: { nome } });
    return uf;
  }
  public async findBySigla(sigla: string): Promise<Uf | undefined> {
    const uf = await this.findOne({ where: { sigla } });
    return uf;
  }
  public async findByStatus(status: number): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { status } });
    return uf;
  }
}

export default UfRepository;
