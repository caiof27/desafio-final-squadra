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

class PutUfService {
  public async execute({
    codigoUF,
    nome,
    sigla,
    status,
  }: IRequest): Promise<Uf[]> {
    const ufRepository = getCustomRepository(UfRepository);

    const uf = await ufRepository.findBycodigoUF(codigoUF);

    if (!uf || uf?.length === 0) {
      throw new AppError('UF não encontrado', 404);
    }
    if (nome === uf[0].nome) {
      throw new AppError('Já existe um UF cadastrado com esse nome!', 404);
    }

    if (sigla === uf[0].sigla) {
      throw new AppError('Já existe um UF cadastrado com essa sigla!', 404);
    }

    if (status !== 1 && status !== 2) {
      throw new AppError(
        'Não foi possível incluir UF no banco de dados. Status precisa ser do valor 1 ou 2',
        404,
      );
    }

    uf[0].nome = nome;
    uf[0].sigla = sigla;
    uf[0].status = status;

    await ufRepository.save(uf);

    const ufReturn = await ufRepository.find();

    return ufReturn;
  }
}

export default PutUfService;
