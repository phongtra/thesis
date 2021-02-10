const Voter = artifacts.require('Voter');

contract('Voter', (accounts) => {
  let [phong, thao] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await Voter.new();
  });
  it('should not register voter if the user has already registered', async () => {
    await contractInstance.registerVoter(thao, 'dsadsa', {
      from: phong,
      value: 1000000000000000
    });
    try {
      await contractInstance.registerVoter(thao, 'dsadsa', {
        from: phong,
        value: 1000000000000000
      });
      assert(false);
    } catch (e) {
      assert(true);
    }
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
