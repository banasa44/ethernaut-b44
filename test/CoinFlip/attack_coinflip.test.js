const CoinFlip = artifacts.require("CoinFlip");
const Attack = artifacts.require("AttackCoinFlip");

contract("Attack", (accounts) => {
  let coinFlipInstance;
  let attackInstance;

  before(async () => {
    coinFlipInstance = await CoinFlip.deployed();
    attackInstance = await Attack.deployed();
  });

  it("should deploy the CoinFlip and Attack contracts", async () => {
    assert(coinFlipInstance.address !== "", "CoinFlip contract not deployed");
    assert(attackInstance.address !== "", "Attack contract not deployed");
  });

  it("should predict the correct coin flip 10 times in a row", async () => {
    for (let i = 0; i < 10; i++) {
      const tx = await attackInstance.attack({ from: accounts[0] });
      assert(tx.receipt.status, `Transaction ${i + 1} failed`);
      const consecutiveWins = await coinFlipInstance.consecutiveWins();
      console.log(`Consecutive Wins: ${consecutiveWins.toString()}`);
    }

    const finalWins = await coinFlipInstance.consecutiveWins();
    assert.equal(finalWins.toNumber(), 10, "Did not reach 10 consecutive wins");
  });
});
