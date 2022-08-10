import BairroRepository from '@modules/bairro/typeorm/repositories/BairroRepository';
import AppError from '@shared/error/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import EnderecoRepository from '../typeorm/repositories/EnderecoRepository';
import PessoaRepository from '../typeorm/repositories/PessoaRepository';

interface IEndereco {
  codigoEndereco: number;
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: string;
  login: string;
  senha: string;
  status: number;
  enderecos: IEndereco[];
}

class PutPessoaService {
  public async execute({
    codigoPessoa,
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

    const pessoa = await pessoaRepository.findOne(codigoPessoa);

    if (!pessoa) {
      throw new AppError(
        'Não foi possível atualizar Pessoa no banco de dados. pessoa não existe',
        404,
      );
    }

    for (let aux = 0; aux < enderecos.length; aux++) {
      // eslint-disable-next-line prefer-const
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

    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.idade = idade;
    pessoa.login = login;
    pessoa.senha = senha;
    pessoa.status = status;

    await pessoaRepository.save(pessoa);

    const arrayToRemove: number[] = [];

    for (let aux = 0; aux < enderecos.length; aux++) {
      arrayToRemove.push(enderecos[aux].codigoEndereco);
    }

    const enderecoRemove = await enderecoRepository.findToRemove(
      arrayToRemove,
      codigoPessoa,
    );

    await enderecoRepository.remove(enderecoRemove);

    for (let aux = 0; aux < enderecos.length; aux++) {
      if (enderecos[aux].codigoEndereco === 0) {
        // eslint-disable-next-line prefer-const
        const codigoBairro = await getCustomRepository(
          BairroRepository,
        ).findBycodigoBairro(enderecos[aux].codigoBairro);

        // eslint-disable-next-line prefer-const
        const enderecoCreate = enderecoRepository.create({
          bairro: codigoBairro,
          codigoPessoa: pessoa.codigoPessoa,
          nomeRua: enderecos[aux].nomeRua,
          numero: enderecos[aux].numero,
          complemento: enderecos[aux].complemento,
          cep: enderecos[aux].cep,
        });

        await enderecoRepository.save(enderecoCreate);
      }
      // eslint-disable-next-line prefer-const
      const endereco = await enderecoRepository.findBycodigoEndereco(
        enderecos[aux].codigoEndereco,
      );

      if (endereco) {
        endereco.codigoBairro = enderecos[aux].codigoBairro;
        endereco.nomeRua = enderecos[aux].nomeRua;
        endereco.numero = enderecos[aux].numero;
        endereco.complemento = enderecos[aux].complemento;
        endereco.cep = enderecos[aux].cep;

        await enderecoRepository.save(endereco);
      }
    }

    const pessoaReturn = await pessoaRepository.find();

    return pessoaReturn;
  }
}

export default PutPessoaService;
