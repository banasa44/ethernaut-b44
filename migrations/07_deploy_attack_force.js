const Attack = artifacts.require("AttackForce");
const Force = artifacts.require("Force");

module.exports = async function (deployer, network, accounts) {
  let forceAddress;

  if (network === "development") {
    // If we are on a local development network (e.g., Ganache), deploy a new Force contract
    await deployer.deploy(Force);
    const forceInstance = await Force.deployed();
    forceAddress = forceInstance.address; // Use the locally deployed address
  } else if (network === "sepolia") {
    // If we are on Sepolia network, use the already deployed Force contract address
    forceAddress = "0x926cbd2c6bec3477F19dD7Bc9a1fEA9f0Bc5De0d"; // Sepolia's Force address
  } else {
    throw new Error(`Unsupported network: ${network}`);
  }
  // Deploy the Attack contract with 0.003 ETH
  await deployer.deploy(Attack, forceAddress, {
    from: accounts[0], // Ensure to specify the deploying account if needed
    value: web3.utils.toWei("0.003", "ether"), // Send 0.003 ETH along with the deployment
  });
};
