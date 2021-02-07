import { TxObj } from 'src/types/TxObj';
import { web3Instance } from './web3Instance';

const { web3 } = web3Instance();
export const createTransaction = async (txObj: TxObj) => {
  const txnCount = await web3.eth.getTransactionCount(txObj.from, 'pending');
  txObj.nonce = txObj.nonce ? txObj.nonce : web3.utils.numberToHex(txnCount);

  if (!txObj.gasPrice) txObj.gasPrice = await web3.eth.getGasPrice();

  // TODO Tạm thời set cứng gasLimit
  txObj.gasLimit = web3.utils.numberToHex(300000);
  txObj.gasPrice = txObj.gasPrice
    ? web3.utils.numberToHex(txObj.gasPrice)
    : undefined;
  txObj.data = txObj.data.encodeABI();
  return txObj;
};
