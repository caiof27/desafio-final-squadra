import { Router } from 'express';
import UfController from '../controllers/UfController';

const ufRouter = Router();
const ufController = new UfController();

ufRouter.get('/', ufController.show);
/*
ufRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  ufController.create,
);

ufRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ufController.update,
);

ufRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ufController.delete,
);
*/

export default ufRouter;
