const Delegate = artifacts.require("Delegate");
const Delegation = artifacts.require("Delegation");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[3]; // Set the owner to the first account

  // Step 1: Deploy the Delegate contract
  await deployer.deploy(Delegate, owner);
  const delegateInstance = await Delegate.deployed();

  // Step 2: Deploy the Delegation contract with the address of the deployed Delegate contract
  await deployer.deploy(Delegation, delegateInstance.address, { from: owner });
  const delegationInstance = await Delegation.deployed();

  console.log("Delegate Contract Address:", delegateInstance.address);
  console.log("Delegation Contract Address:", delegationInstance.address);
};
