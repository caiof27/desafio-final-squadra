import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfRepository from '../typeorm/repositories/UfRepository';

interface IRequest {
  codigoUF: number;
  nome: string;
  sigla: string;
  status: number;
}

class GetUfService {
  public async execute({
    codigoUF,
    nome,
    sigla,
    status,
  }: IRequest): Promise<Uf[] | IRequest | undefined> {
    const ufRepository = getCustomRepository(UfRepository);

    if (!status && !codigoUF && !nome && !sigla) {
      const uf = await ufRepository.find();

      return uf;
    }

    if (codigoUF) {
      const uf = await ufRepository.findBycodigoUF(codigoUF);

      return uf;
    }

    if (nome) {
      const uf = await ufRepository.findByNome(nome);

      return uf;
    }

    if (sigla) {
      const uf = await ufRepository.findBySigla(sigla);

      return uf;
    }

    if (status) {
      const uf = await ufRepository.findByStatus(status);

      return uf;
    }

    throw new AppError('Não foi possível consultar UF no banco de dados.', 404);
  }
}

export default GetUfService;
