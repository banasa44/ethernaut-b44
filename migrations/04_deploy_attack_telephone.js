const Attack = artifacts.require("AttackTelephone");
const Telephone = artifacts.require("Telephone");

module.exports = async function (deployer, network, accounts) {
  let telephoneAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new CoinFlip contract
    await deployer.deploy(Telephone);
    const telephoneInstance = await Telephone.deployed();
    telephoneAddress = telephoneInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed telephone contract address
    telephoneAddress = "0x63d89DB91a95940adE99E2B65D16022BE5A22C6b"; // Sepolia's telephone address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }

  // Deploy the Attack contract with the appropriate telephone address
  await deployer.deploy(Attack, telephoneAddress);
};
