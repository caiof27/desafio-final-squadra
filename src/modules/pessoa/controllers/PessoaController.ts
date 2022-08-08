import { Request, Response } from 'express';
import GetPessoaService from '../services/GetPessoaService';
import PostPessoaService from '../services/PostPessoaService';
import PutPessoaService from '../services/PutPessoaService';

export default class PessoaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const codigoPessoa = parseInt(request.query.codigoPessoa as string);
    const login = request.query.login as string;
    const status = parseInt(request.query.status as string);
    const getBairro = new GetPessoaService();
    const bairro = await getBairro.execute({
      codigoPessoa,
      login,
      status,
    });

    return response.json(bairro);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status, endereco } =
      request.body;
    const createBairro = new PostPessoaService();

    const pessoa = await createBairro.execute({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      endereco,
    });

    return response.json(pessoa);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoPessoa, login, status } = request.body;
    const putBairro = new PutPessoaService();

    const bairro = await putBairro.execute({
      codigoPessoa,
      login,
      status,
    });

    return response.json(bairro);
  }
}
