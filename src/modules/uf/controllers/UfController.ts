import { Request, Response } from 'express';
import GetUfService from '../services/GetUfService';

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

  /*public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;
    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
  */
}
