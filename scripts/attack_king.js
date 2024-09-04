const AttackKing = artifacts.require("AttackKing");

module.exports = async function (callback) {
  try {
    // Get the deployed instance of the AttackKing contract
    const attackInstance = await AttackKing.deployed();
    console.log(
      `Attack contract deployed at address: ${attackInstance.address}`
    );

    const tx = await attackInstance.attack({
      value: web3.utils.toWei("0.076", "ether"),
    });
    console.log(`Attack transaction sent: ${tx.tx}`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
