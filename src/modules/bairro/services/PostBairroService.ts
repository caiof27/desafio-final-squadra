import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '@modules/bairro/typeorm/entities/Bairro';
import BairroRepository from '@modules/bairro/typeorm/repositories/BairroRepository';
import MunicipioRepository from '@modules/municipio/typeorm/repositories/MunicipioRepository';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class PostBairroService {
  public async execute({
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const codigoMunicipioExists = await getCustomRepository(
      MunicipioRepository,
    ).findBycodigoMunicipio(codigoMunicipio);

    if (
      !codigoMunicipioExists ||
      (typeof codigoMunicipioExists !== 'undefined' &&
        codigoMunicipioExists.length === 0)
    ) {
      throw new AppError(
        'Não foi possível incluir Bairro no banco de dados. Codigo Municipio inserido não existe',
        404,
      );
    }

    const bairro = bairroRepository.create({
      municipio: codigoMunicipioExists[0],
      nome,
      status,
    });

    await bairroRepository.save(bairro);

    const bairroReturn = await bairroRepository.find();

    return bairroReturn;
  }
}

export default PostBairroService;
