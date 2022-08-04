import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entities/Uf';

@EntityRepository(Uf)
class UfRepository extends Repository<Uf> {
  public async findBycodigoUF(codigoUF: number): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { codigoUF }, take: 1 });
    return uf;
  }
  public async findByNome(nome: string): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { nome }, take: 1 });
    return uf;
  }
  public async findBySigla(sigla: string): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { sigla }, take: 1 });
    return uf;
  }
  public async findByStatus(status: number): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { status }, take: 1 });
    return uf;
  }
  public async findBySiglaNome(
    sigla: string,
    nome: string,
  ): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { sigla, nome }, take: 1 });
    return uf;
  }
  public async findByUfSigla(
    codigoUF: number,
    sigla: string,
  ): Promise<Uf[] | undefined> {
    const uf = await this.find({
      where: { codigoUF, sigla },
      take: 1,
    });
    return uf;
  }
  public async findByUfnome(
    codigoUF: number,
    nome: string,
  ): Promise<Uf[] | undefined> {
    const uf = await this.find({ where: { codigoUF, nome }, take: 1 });
    return uf;
  }
}

export default UfRepository;
