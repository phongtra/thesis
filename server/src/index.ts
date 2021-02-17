import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerVoter } from './routers/registerVoters';
import { createConnection } from 'typeorm';
import path from 'path';
import { Voter } from './entities/Voter';

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
  app.use(bodyParser.json());
  app.use(cors());
  registerVoter(app);
  app.listen(5000);
};

start();
