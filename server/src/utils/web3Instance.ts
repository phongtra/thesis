import Web3 from 'web3';
import Voter from '../abis/Voter.json';

export const web3Instance = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.FULL_NODE_URL)
  );
  const voterAbi = Voter.abi as any;
  const voterContract = new web3.eth.Contract(voterAbi, process.env.SC_ADDRESS);
  return { web3, voterContract };
};
