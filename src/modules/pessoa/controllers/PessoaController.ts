import { Request, Response } from 'express';
import GetPessoaService from '../services/GetPessoaService';
import PostPessoaService from '../services/PostPessoaService';
import PutPessoaService from '../services/PutPessoaService';

export default class PessoaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const codigoPessoa = parseInt(request.query.codigoPessoa as string);
    const login = request.query.login as string;
    const status = parseInt(request.query.status as string);
    const getPessoa = new GetPessoaService();
    const pessoa = await getPessoa.execute({
      codigoPessoa,
      login,
      status,
    });

    return response.json(pessoa);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status, enderecos } =
      request.body;
    const createPessoa = new PostPessoaService();

    const pessoa = await createPessoa.execute({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    return response.json(pessoa);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    } = request.body;
    const putPessoa = new PutPessoaService();

    const pessoa = await putPessoa.execute({
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    return response.json(pessoa);
  }
}
