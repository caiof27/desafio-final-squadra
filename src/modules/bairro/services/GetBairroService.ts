import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '@modules/bairro/typeorm/entities/Bairro';
import BairroRepository from '@modules/bairro/typeorm/repositories/BairroRepository';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class GetBairroService {
  public async execute({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[] | IRequest | undefined> {
    const bairroRepository = getCustomRepository(BairroRepository);

    if (!codigoBairro && !codigoMunicipio && !nome && !status) {
      const bairro = await bairroRepository.find();

      return bairro;
    }

    if (codigoMunicipio && nome) {
      const bairro = await bairroRepository.findByCodigoMunicipioNome(
        codigoMunicipio,
        nome,
      );

      return bairro;
    }

    if (codigoBairro) {
      const bairro = await bairroRepository.findBycodigoBairro(codigoBairro);

      return bairro;
    }

    if (codigoMunicipio) {
      const bairro = await bairroRepository.findBycodigoMunicipio(
        codigoMunicipio,
      );

      return bairro;
    }

    if (nome) {
      const bairro = await bairroRepository.findByNome(nome);

      return bairro;
    }

    if (status) {
      const bairro = await bairroRepository.findByStatus(status);

      return bairro;
    }

    throw new AppError(
      'Não foi possível consultar bairro no banco de dados.',
      404,
    );
  }
}

export default GetBairroService;
