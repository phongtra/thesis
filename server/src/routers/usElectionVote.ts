import { Request, Response, Express } from 'express';
import { Voter } from '../entities/Voter';
import { TxObj } from '../types/TxObj';
import { createTransaction } from '../utils/createTransaction';
import { signTransaction } from '../utils/signTransaction';
import { web3Instance } from '../utils/web3Instance';
import crypto from 'crypto';

const { web3, usElectionVoteContract } = web3Instance();
export const usElectionVote = (app: Express) => {
  app.post('/us-election-vote', async (req: Request, res: Response) => {
    let confirmNum = 0;
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
      console.log('private key: ', privateKey);
      let tx = await createTransaction(txObj);
      let signedTx = await signTransaction(tx, privateKey);
      await web3.eth
        .sendSignedTransaction(signedTx)
        .on('transactionHash', (txHash) => {
          console.log(txHash);
        })
        .on('confirmation', async (confirmationNumber, receipt) => {
          confirmNum++;
          if (confirmNum === 2) {
            if (!receipt.status) {
              res.status(400).send({ error: 'You have already voted' });
            } else {
              res.send({
                confirmationNumber,
                status: receipt.status,
                message: `You have voted for ${candidate}`
              });
            }
          }
        })
        .on('error', async (error) => {
          console.error(error.stack);
        });
    }
  });
  app.get('/vote-result', async (_req, res: Response) => {
    const joeBidenVote = await usElectionVoteContract.methods
      .getVote('Joe Biden')
      .call();
    const donaldTrumpVote = await usElectionVoteContract.methods
      .getVote('Donald Trump')
      .call();
    res.send({ joeBidenVote, donaldTrumpVote });
  });
};
