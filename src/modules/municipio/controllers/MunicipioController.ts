import { Request, Response } from 'express';
import GetMunicipioService from '../services/GetMunicipioService';
import PostMunicipioService from '../services/PostMunicipioService';
import PutMunicipioService from '../services/PutMunicipioService';

export default class MunicipioController {
  public async show(request: Request, response: Response): Promise<Response> {
    const codigoMunicipio = parseInt(request.query.codigoMunicipio as string);
    const codigoUF = parseInt(request.query.codigoUF as string);
    const nome = request.query.nome as string;
    const status = parseInt(request.query.status as string);
    const getMunicipio = new GetMunicipioService();
    const municipio = await getMunicipio.execute({
      codigoMunicipio,
      codigoUF,
      nome,
      status,
    });

    return response.json(municipio);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoUF, nome, status } = request.body;
    const createMunicipio = new PostMunicipioService();

    const municipio = await createMunicipio.execute({ codigoUF, nome, status });

    return response.json(municipio);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, codigoUF, nome, status } = request.body;
    const putMunicipio = new PutMunicipioService();

    const municipio = await putMunicipio.execute({
      codigoMunicipio,
      codigoUF,
      nome,
      status,
    });

    return response.json(municipio);
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
