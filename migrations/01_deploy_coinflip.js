const CoinFlip = artifacts.require("CoinFlip");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy CoinFlip only on the development network
    await deployer.deploy(CoinFlip);
  }
};
