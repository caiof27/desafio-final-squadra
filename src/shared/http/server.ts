import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/error/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

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
      status: error.name,
      mensagem: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on Port 3333!');
});
