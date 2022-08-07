import { Router } from 'express';
import BairroController from '../controllers/BairroController';

const bairroRouter = Router();
const bairroController = new BairroController();

bairroRouter.get('/', bairroController.show);

bairroRouter.post('/', bairroController.create);

bairroRouter.put('/', bairroController.update);

export default bairroRouter;
