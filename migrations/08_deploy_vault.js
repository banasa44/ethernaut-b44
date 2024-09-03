const Vault = artifacts.require("Vault");

module.exports = async function (deployer, network) {
  if (network === "development") {
    // Deploy Vault only on the development network
    await deployer.deploy(
      Vault,
      "0x626c756500000000000000000000000000000000000000000000000000000000"
    );
  }
};
