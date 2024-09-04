const King = artifacts.require("King");
const Attack = artifacts.require("AttackKing");

contract("King", (accounts) => {
  let kingInstance;
  let attackInstance;

  before(async () => {
    kingInstance = await King.new({
      from: accounts[3],
      value: web3.utils.toWei("5", "ether"),
    });
    attackInstance = await Attack.new(kingInstance.address, {
      from: accounts[0],
    });
  });

  it("should deploy the King and Attack contracts", async () => {
    assert(kingInstance.address !== "", "King contract not deployed");
    assert(attackInstance.address !== "", "Attack contract not deployed");
  });

  it("should set prize to 5ETH", async () => {
    const prize = await kingInstance.prize();
    assert.equal(
      prize.toString(),
      web3.utils.toWei("5", "ether"),
      "The prize hasn't been set properly"
    );
  });

  it("should make the attacking contract become the king", async () => {
    await attackInstance.attack({
      from: accounts[0],
      value: web3.utils.toWei("6", "ether"),
    });

    const newKing = await kingInstance._king();
    assert.equal(
      newKing,
      attackInstance.address,
      "The king hasn't been overthrown by the attacking contract"
    );
  });

  it("should block the King contract from overthrowing the attacking contract", async () => {
    try {
      // Attempt to send a higher prize to overthrow the attacking contract
      await web3.eth.sendTransaction({
        from: accounts[3],
        to: kingInstance.address,
        value: web3.utils.toWei("25", "ether"),
      });
      assert.fail("Expected transaction to fail but it succeeded.");
    } catch (error) {
      console.log(
        "Expected failure when attempting to reclaim kingship:",
        error.message
      );
    }

    const king = await kingInstance._king();
    assert.equal(
      king,
      attackInstance.address,
      "The attacking contract should still be the king."
    );
  });
});
