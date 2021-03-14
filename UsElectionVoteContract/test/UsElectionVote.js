const UsElectionVote = artifacts.require('UsElectionVote');

contract('UsElectionVote', (accounts) => {
  let [phong, thao] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await UsElectionVote.new();
  });
  it('should vote for Biden', async () => {
    const result = await contractInstance.vote(phong, 'Joe Biden', {
      from: phong
    });
    assert.equal(result.receipt.status, true);
    const bidenVote = await contractInstance.getVote('Joe Biden', {
      from: phong
    });
    assert.equal(bidenVote, 1);
  });
  afterEach(async () => {
    await contractInstance.kill();
  });
});
