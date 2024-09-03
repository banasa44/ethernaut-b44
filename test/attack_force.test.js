const Force = artifacts.require("Force");
const Attack = artifacts.require("AttackForce");

// const accounts = await web3.eth.getAccounts();
// const attacker = accounts[0];

contract("Attack", (accounts) => {
  let forceInstance;
  let attackInstance;
  const value = web3.utils.toWei("0.003", "ether");

  before(async () => {
    forceInstance = await Force.new();
    attackInstance = await Attack.new(forceInstance.address, {
      from: accounts[0], // Ensure to specify the deploying account if needed
      value: web3.utils.toWei("0.003", "ether"), // Send 0.003 ETH
    });
  });

  it("should deploy the Force and Attack contracts", async () => {
    assert(forceInstance.address !== "", "Force contract not deployed");
    assert(attackInstance.address !== "", "Attack contract not deployed");
  });

  it("should send ETH to Force contract", async () => {
    tx = await attackInstance.attack();
    const balance = await web3.eth.getBalance(forceInstance.address);
    assert.equal(balance, value, "ETH hadn't arrived to Force contract");
  });
});
