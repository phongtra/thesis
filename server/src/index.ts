import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerVoter } from './routers/registerVoters';

const app = express();

const start = async () => {
  app.use(bodyParser.json());
  app.use(cors());
  registerVoter(app);
  app.listen(5000);
};

start();
