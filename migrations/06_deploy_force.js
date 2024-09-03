const Force = artifacts.require("Force");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy Force only on the development network
    await deployer.deploy(Force);
  }
};
