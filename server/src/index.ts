import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { web3Instance } from './utils/web3Instance';
import { TxObj } from './types/TxObj';
import { createTransaction } from './utils/createTransaction';
import { signTransaction } from './utils/signTransaction';

const app = express();
const { web3, voterContract } = web3Instance();

const start = async () => {
  app.use(bodyParser.json());
  app.use(cors());
  app.post('/register-voter', async (req: Request, res: Response) => {
    const { voterAddress, socialNumber } = req.body;
    const data = await voterContract.methods.registerVoter(
      voterAddress,
      socialNumber
    );
    const txObj: TxObj = {
      from: process.env.ADMIN_ADDRESS,
      data: data,
      to: process.env.SC_ADDRESS,
      value: 1000000000000000
    };
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    let tx = await createTransaction(txObj);
    let signedTx = await signTransaction(tx, adminPrivateKey);
    await web3.eth
      .sendSignedTransaction(signedTx)
      .on('transactionHash', (txHash) => {
        res.json({ transactionHash: txHash });
      })
      .on('error', async (err) => {
        res.json({ error: 'something went wrong' });
      });
  });
  app.listen(5000);
};

start();
