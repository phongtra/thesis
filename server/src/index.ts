import express, { Request, Response } from 'express';

import { web3Instance } from './utils/web3Instance';
import { TxObj } from './types/TxObj';
import { createTransaction } from './utils/createTransaction';
import { signTransaction } from './utils/signTransaction';

const app = express();
const { web3, voterContract } = web3Instance();

const start = async () => {
  app.get('/', async (_req: Request, res: Response) => {
    const data = await voterContract.methods.registerVoter(
      '0xea1b00396ba2291a6b3e73d9961bf0c9389f69cb',
      'yeah'
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
        res.json({ error: "something wen't wrong" });
      });
  });
  app.listen(5000);
};

start();
