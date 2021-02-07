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
      from: '0xbc5aC9e4bEe4aAE9F0D97F27d9e81B3eBDC8a39a',
      data: data,
      to: '0xb81602bf4fab4d93ac531eb458cb58061e042380',
      value: 1000000000000000
    };
    const adminPrivateKey =
      'e75593c07554c41cc48971a4454dcaf21da3616ad55c3d3e8747f8acd0715e19';
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
