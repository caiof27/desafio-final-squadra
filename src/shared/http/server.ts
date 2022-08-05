import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/error/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';
import { pagination } from 'typeorm-pagination';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: error.status,
        mensagem: error.mensagem,
      });
    }

    return response.status(500).json({
      status: 500,
      mensagem: 'Erro interno do servidor',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on Port 3333!');
});
