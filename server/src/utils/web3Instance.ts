import Web3 from 'web3';
import Voter from '../abis/Voter.json';
import UsElectionVoteContract from '../abis/UsElectionVote.json';
import dotenv from 'dotenv';
dotenv.config();

export const web3Instance = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.FULL_NODE_URL)
  );
  const voterAbi = Voter.abi as any;
  const usElectionVoteAbi = UsElectionVoteContract.abi as any;
  const voterContract = new web3.eth.Contract(
    voterAbi,
    process.env.VOTER_SC_ADDRESS
  );
  const usElectionVoteContract = new web3.eth.Contract(
    usElectionVoteAbi,
    process.env.US_ELECTION_VOTE_SC_ADDRESS
  );
  return { web3, voterContract, usElectionVoteContract };
};
