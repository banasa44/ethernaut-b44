const Building = artifacts.require("Building");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Building, "0xCcA2bf0e17022Fc6D0D293C4dBFa7edEAdb566A3");
};
