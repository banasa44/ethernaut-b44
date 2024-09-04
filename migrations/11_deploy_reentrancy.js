const Reentrancy = artifacts.require("Reentrancy");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy Reentrancy only on the development network
    await deployer.deploy(Reentrancy);
  }
};
