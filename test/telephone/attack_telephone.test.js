const Telephone = artifacts.require("Telephone");
const Attack = artifacts.require("AttackTelephone");

// const accounts = await web3.eth.getAccounts();
// const attacker = accounts[0];

contract("Attack", (accounts) => {
  let telephoneInstance;
  let attackInstance;
  const attacker = accounts[0];

  before(async () => {
    telephoneInstance = await Telephone.deployed();
    attackInstance = await Attack.deployed();
  });

  it("should deploy the Telephone and Attack contracts", async () => {
    assert(telephoneInstance.address !== "", "Telephone contract not deployed");
    assert(attackInstance.address !== "", "Attack contract not deployed");
  });

  it("should claim ownership of the Telephone contract", async () => {
    tx = await attackInstance.attack();

    const owner = await telephoneInstance.owner();
    assert.equal(owner, attacker, "Ownership was not correctly claimed");
  });
});
