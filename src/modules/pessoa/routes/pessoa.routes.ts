import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const pessoaRouter = Router();
const pessoaController = new PessoaController();

pessoaRouter.get('/', pessoaController.show);

pessoaRouter.post('/', pessoaController.create);

pessoaRouter.put('/', pessoaController.update);

export default pessoaRouter;
