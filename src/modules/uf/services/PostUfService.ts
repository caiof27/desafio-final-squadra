import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entities/Uf';
import UfRepository from '../typeorm/repositories/UfRepository';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class PostUfService {
  public async execute({ sigla, nome, status }: IRequest): Promise<Uf[]> {
    const ufRepository = getCustomRepository(UfRepository);

    const nomeExists = await ufRepository.findByNome(nome);

    if (nomeExists) {
      throw new AppError(
        'Não foi possível incluir UF no banco de dados. Nome já está sendo utilizada',
        404,
      );
    }

    const siglaExists = await ufRepository.findBySigla(sigla);

    if (siglaExists) {
      throw new AppError(
        'Não foi possível incluir UF no banco de dados. Sigla já está sendo utilizada',
        404,
      );
    }

    const uf = ufRepository.create({
      sigla,
      nome,
      status,
    });

    await ufRepository.save(uf);

    const ufReturn = ufRepository.find();

    return ufReturn;
  }
}

export default PostUfService;
