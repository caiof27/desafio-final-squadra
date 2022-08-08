import AppError from '@shared/error/AppError';
import { getCustomRepository, SelectQueryBuilder } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoaRepository from '../typeorm/repositories/PessoaRepository';

interface IRequest {
  codigoPessoa: number;
  login: string;
  status: number;
}

class GetPessoaService {
  public async execute({
    codigoPessoa,
    login,
    status,
  }: IRequest): Promise<Pessoa[] | SelectQueryBuilder<Pessoa> | undefined> {
    const pessoaRepository = getCustomRepository(PessoaRepository);

    if (!codigoPessoa && !login && !status) {
      const pessoa = await pessoaRepository.findAll();

      return pessoa;
    }

    if (codigoPessoa) {
      const pessoa = await pessoaRepository.findBycodigoPessoa(codigoPessoa);

      return pessoa;
    }

    if (login) {
      const pessoa = await pessoaRepository.findByLogin(login);

      return pessoa;
    }

    if (status) {
      const pessoa = await pessoaRepository.findByStatus(status);

      return pessoa;
    }

    throw new AppError(
      'Não foi possível consultar pessoa no banco de dados.',
      404,
    );
  }
}

export default GetPessoaService;
