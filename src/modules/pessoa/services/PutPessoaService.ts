import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Bairro from '@modules/bairro/typeorm/entities/Bairro';
import BairroRepository from '@modules/bairro/typeorm/repositories/BairroRepository';

interface IRequest {
  codigoPessoa: number;
  login: number;
  status: number;
}

class PutPessoaService {
  public async execute({
    codigoPessoa,
    login,
    status,
  }: IRequest): Promise<Bairro[]> {
    const bairroRepository = getCustomRepository(BairroRepository);

    const bairro = await bairroRepository.findBycodigoBairro(codigoBairro);

    if (!bairro) {
      throw new AppError('Bairo não encontrado', 404);
    }
    if (nome === bairro.nome) {
      throw new AppError('Já existe um Bairro cadastrado com esse nome!', 404);
    }

    if (status !== 1 && status !== 2) {
      throw new AppError(
        'Não foi possível incluir Bairro no banco de dados. Status precisa ser do valor 1 ou 2',
        404,
      );
    }

    bairro.nome = nome;
    bairro.codigoMunicipio = codigoMunicipio;
    bairro.status = status;

    await bairroRepository.save(bairro);

    const bairroReturn = await bairroRepository.find();

    return bairroReturn;
  }
}

export default PutPessoaService;
