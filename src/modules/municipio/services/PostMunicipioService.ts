import UfRepository from '@modules/uf/typeorm/repositories/UfRepository';
import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipioRepository from '../typeorm/repositories/MunicipioRepository';

interface IRequest {
  codigoUF: number;
  nome: string;
  status: number;
}

class PostMunicipioService {
  public async execute({
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const municipioRepository = getCustomRepository(MunicipioRepository);

    const codigoUFExists = await getCustomRepository(
      UfRepository,
    ).findBycodigoUF(codigoUF);

    if (!codigoUFExists) {
      throw new AppError(
        'Não foi possível incluir Municipio no banco de dados. Codigo UF inserido não existe',
        404,
      );
    }

    const nomeExists = await municipioRepository.findByNome(nome);

    if (nomeExists) {
      throw new AppError(
        'Não foi possível incluir Municipio no banco de dados. Nome já está sendo utilizada',
        404,
      );
    }

    const municipio = municipioRepository.create({
      uf: codigoUFExists,
      nome,
      status,
    });

    await municipioRepository.save(municipio);

    const municipioReturn = await municipioRepository.find();

    return municipioReturn;
  }
}

export default PostMunicipioService;
