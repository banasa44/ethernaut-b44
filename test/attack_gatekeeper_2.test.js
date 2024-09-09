const GatekeeperTwo = artifacts.require("GatekeeperTwo");
const AttackGatekeeperTwo = artifacts.require("AttackGatekeeperTwo");

contract("GatekeeperTwo", (accounts) => {
  let gatekeeperInstance;

  before(async () => {
    // Deploy the GatekeeperTwo contract
    gatekeeperInstance = await GatekeeperTwo.new({ from: accounts[1] });
  });

  it("should craft the correct gateKey and pass all gates from constructor", async () => {
    // Get the deployed address of the GatekeeperTwo contract
    const gatekeeperAddress = gatekeeperInstance.address;

    // Deploy the AttackGatekeeperTwo contract which carries out the attack in its constructor
    const attackInstance = await AttackGatekeeperTwo.new(gatekeeperAddress, {
      from: accounts[0],
    });

    // Verify that the constructor attack passed all gates and set the correct entrant
    const entrant = await gatekeeperInstance.entrant();
    assert.equal(
      entrant,
      accounts[0],
      "The attacking account did not become the entrant"
    );
  });
});
