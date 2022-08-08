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
  idade: number;
  login: string;
  senha: string;
  status: number;
  endereco: IEndereco[];
}

class PostPessoaService {
  public async execute({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    endereco,
  }: IRequest): Promise<Pessoa[]> {
    const pessoaRepository = getCustomRepository(PessoaRepository);
    const enderecoRepository = getCustomRepository(EnderecoRepository);

    let aux = 0;

    while (aux < endereco.length) {
      const codigoBairroExists = await getCustomRepository(
        BairroRepository,
      ).findBycodigoBairro(endereco[aux].codigoBairro);

      if (!codigoBairroExists) {
        throw new AppError(
          'Não foi possível incluir Bairro no banco de dados. Codigo Municipio inserido não existe',
          404,
        );
      }
      aux++;
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

    aux = 0;

    while (aux < endereco.length) {
      // eslint-disable-next-line prefer-const
      let codigoBairroExists = await getCustomRepository(
        BairroRepository,
      ).findBycodigoBairro(endereco[aux].codigoBairro);

      // eslint-disable-next-line prefer-const
      let enderecoCreate = enderecoRepository.create({
        bairro: codigoBairroExists,
        codigoPessoa: pessoa.codigoPessoa,
        nomeRua: endereco[aux].nomeRua,
        numero: endereco[aux].numero,
        complemento: endereco[aux].complemento,
        cep: endereco[aux].cep,
      });

      await enderecoRepository.save(enderecoCreate);
      aux++;
    }

    const pessoaReturn = await pessoaRepository.find();

    return pessoaReturn;
  }
}

export default PostPessoaService;
