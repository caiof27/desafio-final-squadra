import { Request, Response } from 'express';
import GetBairroService from '../services/GetBairroService';
import PostBairroService from '../services/PostBairroService';
import PutBairroService from '../services/PutBairroService';

export default class BairroController {
  public async show(request: Request, response: Response): Promise<Response> {
    const codigoBairro = parseInt(request.query.codigoBairro as string);
    const codigoMunicipio = parseInt(request.query.codigoMunicipio as string);
    const nome = request.query.nome as string;
    const status = parseInt(request.query.status as string);
    const getBairro = new GetBairroService();
    const bairro = await getBairro.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(bairro);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, nome, status } = request.body;
    const createBairro = new PostBairroService();

    const bairro = await createBairro.execute({
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(bairro);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome, status } = request.body;
    const putBairro = new PutBairroService();

    const bairro = await putBairro.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });

    return response.json(bairro);
  }
}
