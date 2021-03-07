import { Request, Response, Express } from 'express';
import crypto from 'crypto';
import { Voter } from '../entities/Voter';
import { TxObj } from '../types/TxObj';
import { createTransaction } from '../utils/createTransaction';
import { signTransaction } from '../utils/signTransaction';
import { web3Instance } from '../utils/web3Instance';
const { web3, voterContract } = web3Instance();
export const registerVoter = (app: Express) => {
  app.post('/register-voter', async (req: Request, res: Response) => {
    const { socialNumber } = req.body;
    const existingSocialNumber = await Voter.findOne({ socialNumber });
    if (existingSocialNumber) {
      return res
        .status(400)
        .send({ error: 'The social number is already registered' });
    }
    const account = web3.eth.accounts.create();
    console.log('address: ', account.address);
    console.log('privateKey: ', account.privateKey);
    const data = await voterContract.methods.registerVoter(
      account.address,
      socialNumber
    );
    const txObj: TxObj = {
      from: process.env.ADMIN_ADDRESS,
      data: data,
      to: process.env.VOTER_SC_ADDRESS,
      value: 1000000000000000
    };
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    let tx = await createTransaction(txObj);
    let signedTx = await signTransaction(tx, adminPrivateKey);
    return await web3.eth
      .sendSignedTransaction(signedTx)
      .on('transactionHash', (txHash) => {
        console.log(txHash);
      })
      .on('confirmation', async (confirmationNumber, receipt) => {
        if (!receipt.status) {
          return res.status(400).send({ error: 'Transaction failed' });
        }
        const cipher = crypto.createCipher(
          'aes-128-cbc',
          process.env.ENCRYPTED_KEY
        );
        let ciphertext = cipher.update(account.privateKey, 'utf8', 'base64');
        ciphertext += cipher.final('base64');
        await Voter.create({
          socialNumber,
          address: account.address,
          privateKey: ciphertext
        }).save();
        return res.send({
          confirmationNumber,
          status: receipt.status,
          message: 'Account has been registered'
        });
      })
      .on('error', async (error) => {
        console.error(error.stack);
      });
  });
};
