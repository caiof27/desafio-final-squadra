import { Router } from 'express';
import UfController from '../controllers/UfController';

const ufRouter = Router();
const ufController = new UfController();

ufRouter.get('/', ufController.show);

ufRouter.post('/', ufController.create);

ufRouter.put('/', ufController.update);

export default ufRouter;
