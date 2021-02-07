import Web3 from 'web3';
import Voter from '../abis/Voter.json';

export const web3Instance = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/b6ea1cd9d4a64650a661639e777e6919'
    )
  );
  const voterAbi = Voter.abi as any;
  const voterContract = new web3.eth.Contract(
    voterAbi,
    '0xb81602bF4fAb4d93AC531EB458cB58061e042380'
  );
  return { web3, voterContract };
};
