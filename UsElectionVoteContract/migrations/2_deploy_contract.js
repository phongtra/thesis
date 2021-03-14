const UsElectionVote = artifacts.require('UsElectionVote');

module.exports = function (deployer) {
  deployer.deploy(UsElectionVote);
};
