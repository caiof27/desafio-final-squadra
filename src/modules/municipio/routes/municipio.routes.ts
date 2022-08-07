import { Router } from 'express';
import MunicipioController from '../controllers/MunicipioController';

const municipioRouter = Router();
const municipioController = new MunicipioController();

municipioRouter.get('/', municipioController.show);

municipioRouter.post('/', municipioController.create);

municipioRouter.put('/', municipioController.update);

export default municipioRouter;
