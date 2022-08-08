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

class GetMunicipioService {
  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[] | IRequest | undefined> {
    const municipioRepository = getCustomRepository(MunicipioRepository);

    if (!codigoMunicipio && !codigoUF && !nome && !status) {
      const municipio = await municipioRepository.find();

      return municipio;
    }

    if (codigoMunicipio) {
      const municipio = await municipioRepository.findBycodigoMunicipio(
        codigoMunicipio,
      );

      return municipio;
    }

    if (codigoUF) {
      const municipio = await municipioRepository.findBycodigoUF(codigoUF);

      return municipio;
    }

    if (nome) {
      const municipio = await municipioRepository.findByNome(nome);

      return municipio;
    }

    if (status) {
      const municipio = await municipioRepository.findByStatus(status);

      return municipio;
    }

    throw new AppError(
      'Não foi possível consultar municipio no banco de dados.',
      404,
    );
  }
}

export default GetMunicipioService;
