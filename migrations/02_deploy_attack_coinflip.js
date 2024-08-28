const Attack = artifacts.require("AttackCoinFlip");
const CoinFlip = artifacts.require("CoinFlip");

module.exports = async function (deployer, network, accounts) {
  let coinFlipAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new CoinFlip contract
    await deployer.deploy(CoinFlip);
    const coinFlipInstance = await CoinFlip.deployed();
    coinFlipAddress = coinFlipInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed CoinFlip contract address
    coinFlipAddress = "0xA62fE5344FE62AdC1F356447B669E9E6D10abaaF"; // Sepolia's CoinFlip address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }

  // Deploy the Attack contract with the appropriate CoinFlip address
  await deployer.deploy(Attack, coinFlipAddress);
};
