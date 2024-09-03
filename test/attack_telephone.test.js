const Telephone = artifacts.require("Telephone");
const Attack = artifacts.require("AttackTelephone");

contract("Attack", (accounts) => {
  let telephoneInstance;
  let attackInstance;
  const attacker = accounts[0];

  before(async () => {
    telephoneInstance = await Telephone.new();
    attackInstance = await Attack.new(telephoneInstance.address);
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
