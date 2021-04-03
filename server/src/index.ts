import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { registerVoter } from './routers/registerVoters';
import { createConnection } from 'typeorm';
import path from 'path';
import { Voter } from './entities/Voter';
import { usElectionVote } from './routers/usElectionVote';

dotenv.config();

const app = express();

const start = async () => {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DB_URL,
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Voter]
  });
  await connection.runMigrations();
  app.use(express.json());
  app.use(cors());
  registerVoter(app);
  usElectionVote(app);
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send(err.message);
  });
  app.listen(5000);
};

start();
