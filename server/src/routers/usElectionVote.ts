import { Request, Response, Express } from 'express';
import { Voter } from 'src/entities/Voter';
import { TxObj } from '../types/TxObj';
import { createTransaction } from '../utils/createTransaction';
import { signTransaction } from '../utils/signTransaction';
import { web3Instance } from '../utils/web3Instance';
import crypto from 'crypto';

const { web3, usElectionVoteContract } = web3Instance();
export const usElectionVote = (app: Express) => {
  app.post('/us-election-vote', async (req: Request, res: Response) => {
    const { candidate, socialNumber } = req.body;
    const voter = await Voter.findOne({ socialNumber });
    if (!voter || !voter.address) {
      res
        .status(400)
        .send({ error: 'The voter does not exist or not yet registered' });
    } else {
      const data = await usElectionVoteContract.methods.vote(
        voter.address,
        candidate
      );
      const txObj: TxObj = {
        from: voter.address,
        data: data,
        to: process.env.US_ELECTION_VOTE_SC_ADDRESS
      };
      const encryptedPrivateKey = voter.privateKey;
      const decipher = crypto.createDecipher(
        'aes-128-cbc',
        process.env.ENCRYPTED_KEY
      );
      let privateKey = decipher.update(encryptedPrivateKey, 'base64', 'utf8');
      privateKey += decipher.final('utf8');
      let tx = await createTransaction(txObj);
      let signedTx = await signTransaction(tx, privateKey);
      await web3.eth
        .sendSignedTransaction(signedTx)
        .on('transactionHash', (txHash) => {
          res.json({ transactionHash: txHash });
        })
        .on('error', async (err) => {
          res.json({ error: 'something went wrong' });
        });
    }
  });
};
