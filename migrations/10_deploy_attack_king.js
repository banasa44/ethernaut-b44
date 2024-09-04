const Attack = artifacts.require("AttackKing");
const King = artifacts.require("King");

module.exports = async function (deployer, network, accounts) {
  let kingAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new King contract
    await deployer.deploy(King);
    const kingInstance = await King.deployed();
    kingAddress = kingInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed King contract address
    kingAddress = "0x9ddb1bb0eB2Dd7852a5336B8A798dc113E092658"; // Sepolia's King address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }
  // Deploy the Attack contract
  await deployer.deploy(Attack, kingAddress);
};
