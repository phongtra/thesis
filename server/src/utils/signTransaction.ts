import { TxObj } from '../types/TxObj';
import { web3Instance } from './web3Instance';
import * as EthereumTx from 'ethereumjs-tx';

const { web3 } = web3Instance();
export const signTransaction = async (txObj: TxObj, privateKey: string) => {
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
