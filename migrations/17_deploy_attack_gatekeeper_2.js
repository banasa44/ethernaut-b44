const Attack = artifacts.require("AttackGatekeeperTwo");
const GatekeeperTwo = artifacts.require("GatekeeperTwo");

module.exports = async function (deployer, network, accounts) {
  let gatekeeperTwoAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new GatekeeperTwo contract
    await deployer.deploy(GatekeeperTwo);
    const gatekeeperTwoInstance = await GatekeeperTwo.deployed();
    gatekeeperTwoAddress = gatekeeperTwoInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed GatekeeperTwo contract address
    gatekeeperTwoAddress = "0x60348A66665fA0FA0cAC353D1B687ba26261811F"; // Sepolia's GatekeeperTwo address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }
  // Deploy the Attack contract
  await deployer.deploy(Attack, gatekeeperTwoAddress);
};
