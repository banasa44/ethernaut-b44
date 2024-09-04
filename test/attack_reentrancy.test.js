const AttackReentrancy = artifacts.require("AttackReentrancy");
const Reentrancy = artifacts.require("Reentrancy");

contract("AttackReentrancy", (accounts) => {
  let attackInstance;
  let reentrancyInstance;

  before(async () => {
    // Deploy the Reentrancy contract
    reentrancyInstance = await Reentrancy.new({
      from: accounts[1],
    });

    // Deploy the AttackReentrancy contract, passing the Reentrancy contract's address
    attackInstance = await AttackReentrancy.new(reentrancyInstance.address, {
      from: accounts[0],
    });
  });

  it("should deploy the Attack and Reentrancy contracts", async () => {
    assert(attackInstance.address !== "", "Attack contract not deployed");
    assert(
      reentrancyInstance.address !== "",
      "Reentrancy contract not deployed"
    );
  });

  it("should perform the attack and drain the Reentrancy contract", async () => {
    // Initial donation to set up the balance
    await reentrancyInstance.donate(attackInstance.address, {
      from: accounts[1],
      value: web3.utils.toWei("1", "ether"),
    });

    // Perform the attack
    const tx = await attackInstance.attack({
      from: accounts[0],
      value: web3.utils.toWei("0.003", "ether"),
    });
    console.log("Attack transaction sent:", tx.tx);

    // Check the balance of the Reentrancy contract after the attack
    const balance = await web3.eth.getBalance(reentrancyInstance.address);
    assert.equal(
      balance,
      "0",
      "Reentrancy contract still has funds, attack failed"
    );
  });
});
