const Voter = artifacts.require('Voter');

contract('Voter', (accounts) => {
  let [phong, thao] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await Voter.new();
  });
  it('should transfer the money to Thao', async () => {
    const result = await contractInstance.registerVoter(thao, 'dsadsa', {
      from: phong,
      value: 1000000000000000
    });
    assert.equal(result.receipt.status, true);
  });
  afterEach(async () => {
    await contractInstance.kill();
  });
});
