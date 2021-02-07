import { Request, Response, Express } from 'express';
import { TxObj } from 'src/types/TxObj';
import { createTransaction } from 'src/utils/createTransaction';
import { signTransaction } from 'src/utils/signTransaction';
import { web3Instance } from 'src/utils/web3Instance';
const { web3, voterContract } = web3Instance();
export const registerVoter = (app: Express) => {
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
};