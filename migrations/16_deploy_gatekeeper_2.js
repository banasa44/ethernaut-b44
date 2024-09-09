const GatekeeperTwo = artifacts.require("GatekeeperTwo");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy GatekeeperTwo only on the development network
    await deployer.deploy(GatekeeperTwo);
  }
};
