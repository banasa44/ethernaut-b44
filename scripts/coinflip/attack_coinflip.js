const Attack = artifacts.require("AttackCoinFlip");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const attacker = accounts[0];

    const attackInstance = await Attack.deployed();

    // Perform the attack 10 times
    for (let i = 0; i < 10; i++) {
      const tx = await attackInstance.attack({ from: attacker });
      console.log(`Transaction ${i + 1} sent: ${tx.tx}`);
    }

    // Check the result
    console.log("Attack script executed successfully.");

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
