import { Router } from 'express';
import ufRouter from '@modules/uf/routes/uf.routes';
import municipioRouter from '@modules/municipio/routes/municipio.routes';
import bairroRouter from '@modules/bairro/routes/bairro.routes';

const routes = Router();

routes.use('/uf', ufRouter);
routes.use('/municipio', municipioRouter);
routes.use('/bairro', bairroRouter);

export default routes;
