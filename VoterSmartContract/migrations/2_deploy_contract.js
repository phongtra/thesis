const Voter = artifacts.require('Voter');

module.exports = function (deployer) {
  deployer.deploy(Voter);
};
