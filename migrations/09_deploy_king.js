const King = artifacts.require("King");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy King only on the development network
    await deployer.deploy(King);
  }
};
