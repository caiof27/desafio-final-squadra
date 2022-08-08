import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entities/Municipio';
import MunicipioRepository from '../typeorm/repositories/MunicipioRepository';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
}

class PutMunicipioService {
  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const municipioRepository = getCustomRepository(MunicipioRepository);

    const municipio = await municipioRepository.findBycodigoMunicipio(
      codigoMunicipio,
    );

    if (!municipio) {
      throw new AppError('Municipio não encontrado', 404);
    }

    const nomeExists = await municipioRepository.findByNome(nome);

    if (nomeExists) {
      throw new AppError(
        'Já existe um Municipio cadastrado com esse nome!',
        404,
      );
    }

    if (status !== 1 && status !== 2) {
      throw new AppError(
        'Não foi possível incluir Municipio no banco de dados. Status precisa ser do valor 1 ou 2',
        404,
      );
    }

    municipio.nome = nome;
    municipio.codigoUF = codigoUF;
    municipio.status = status;

    await municipioRepository.save(municipio);

    const ufReturn = await municipioRepository.find();

    return ufReturn;
  }
}

export default PutMunicipioService;
