const Attack = artifacts.require("AttackReentrancy");
const Reentrancy = artifacts.require("Reentrancy");

module.exports = async function (deployer, network, accounts) {
  let reentrancyAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new Reentrancy contract
    await deployer.deploy(Reentrancy);
    const reentrancyInstance = await Reentrancy.deployed();
    reentrancyAddress = reentrancyInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed Reentrancy contract address
    reentrancyAddress = "0x00e2ba789acD71DAb6a255275e5eF4dE88601575"; // Sepolia's Reentrancy address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }
  // Deploy the Attack contract
  await deployer.deploy(Attack, reentrancyAddress);
};
