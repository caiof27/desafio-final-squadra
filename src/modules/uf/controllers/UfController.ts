import { Request, Response } from 'express';
import GetUfService from '../services/GetUfService';
import PostUfService from '../services/PostUfService';
import PutUfService from '../services/PutUfService';

export default class UfController {
  public async show(request: Request, response: Response): Promise<Response> {
    const codigoUF = parseInt(request.query.codigoUF as string);
    const nome = request.query.nome as string;
    const sigla = request.query.sigla as string;
    const status = parseInt(request.query.status as string);
    const getUf = new GetUfService();
    const uf = await getUf.execute({ codigoUF, nome, sigla, status });

    return response.json(uf);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;
    const createUf = new PostUfService();

    const uf = await createUf.execute({ sigla, nome, status });

    return response.json(uf);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoUF, sigla, nome, status } = request.body;
    const putUf = new PutUfService();

    const uf = await putUf.execute({ codigoUF, nome, sigla, status });

    return response.json(uf);
  }
  /*
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteuf = new DeleteufService();

    await deleteuf.execute({ id });

    return response.json([]);
  }
  */
}
