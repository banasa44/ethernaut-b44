const Attack = artifacts.require("AttackGatekeeperOne");
const GatekeeperOne = artifacts.require("GatekeeperOne");

module.exports = async function (deployer, network, accounts) {
  let gatekeeperOneAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new GatekeeperOne contract
    await deployer.deploy(GatekeeperOne);
    const gatekeeperOneInstance = await GatekeeperOne.deployed();
    gatekeeperOneAddress = gatekeeperOneInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed GatekeeperOne contract address
    gatekeeperOneAddress = "0x96aFbEFB2D3412B86754B79Dc7811157FeA5886F"; // Sepolia's GatekeeperOne address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }
  // Deploy the Attack contract
  await deployer.deploy(Attack, gatekeeperOneAddress);
};
