import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import EnderecoRepository from '../typeorm/repositories/EnderecoRepository';
import PessoaRepository from '../typeorm/repositories/PessoaRepository';
import BairroRepository from '@modules/bairro/typeorm/repositories/BairroRepository';

interface IEndereco {
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: string;
  login: string;
  senha: string;
  status: number;
  enderecos: IEndereco[];
}

class PostPessoaService {
  public async execute({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
  }: IRequest): Promise<Pessoa[]> {
    const pessoaRepository = getCustomRepository(PessoaRepository);
    const enderecoRepository = getCustomRepository(EnderecoRepository);

    for (let aux = 0; aux < enderecos.length; aux++) {
      const codigoBairroExists = await getCustomRepository(
        BairroRepository,
      ).findBycodigoBairro(enderecos[aux].codigoBairro);

      if (!codigoBairroExists) {
        throw new AppError(
          'Não foi possível incluir Bairro no banco de dados. Codigo Bairro inserido não existe',
          404,
        );
      }
    }

    const loginExists = await pessoaRepository.findByLogin(login);

    if (!loginExists) {
      throw new AppError(
        'Não foi possível incluir Pessoa no banco de dados. Login inserido já existe',
        404,
      );
    }

    let pessoa = pessoaRepository.create({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    pessoa = await pessoaRepository.save(pessoa);

    for (let aux = 0; aux < enderecos.length; aux++) {
      const codigoBairroExists = await getCustomRepository(
        BairroRepository,
      ).findBycodigoBairro(enderecos[aux].codigoBairro);

      const enderecoCreate = enderecoRepository.create({
        bairro: codigoBairroExists,
        codigoPessoa: pessoa.codigoPessoa,
        nomeRua: enderecos[aux].nomeRua,
        numero: enderecos[aux].numero,
        complemento: enderecos[aux].complemento,
        cep: enderecos[aux].cep,
      });

      await enderecoRepository.save(enderecoCreate);
    }

    const pessoaReturn = await pessoaRepository.find();

    return pessoaReturn;
  }
}

export default PostPessoaService;
