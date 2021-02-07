import express, { Request, Response } from 'express';
import * as EthereumTx from 'ethereumjs-tx';
import { web3Instance } from './utils/web3Instance';

const app = express();
const { web3, voterContract } = web3Instance();

export const createTx = async (txObj: any) => {
  const txnCount = await web3.eth.getTransactionCount(txObj.from, 'pending');
  txObj.nonce = txObj.nonce ? txObj.nonce : web3.utils.numberToHex(txnCount);

  if (!txObj.gasPrice) txObj.gasPrice = await web3.eth.getGasPrice();

  // TODO Tạm thời set cứng gasLimit
  txObj.gasLimit = web3.utils.numberToHex(300000);
  txObj.gasPrice = txObj.gasPrice
    ? web3.utils.numberToHex(txObj.gasPrice)
    : undefined;
  txObj.data = txObj.data.encodeABI();
  return await txObj;
};

export const signTransaction = async (txObj: any, privateKey: string) => {
  try {
    const chain = await web3.eth.net.getId();
    const tx = new EthereumTx.Transaction(txObj, { chain: chain });
    const key = Buffer.from(privateKey, 'hex');
    tx.sign(key);
    return '0x' + tx.serialize().toString('hex');
  } catch (e) {
    throw e;
  }
};

const start = async () => {
  app.get('/', async (_req: Request, res: Response) => {
    const data = await voterContract.methods.registerVoter(
      '0xea1b00396ba2291a6b3e73d9961bf0c9389f69cb',
      'yeah'
    );
    const txObj = {
      from: process.env.ADMIN_ADDRESS,
      data: data,
      to: process.env.SC_ADDRESS,
      value: 1000000000000000
    };
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    let tx = await createTx(txObj);
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
