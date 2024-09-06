const GatekeeperOne = artifacts.require("GatekeeperOne");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy GatekeeperOne only on the development network
    await deployer.deploy(GatekeeperOne);
  }
};
